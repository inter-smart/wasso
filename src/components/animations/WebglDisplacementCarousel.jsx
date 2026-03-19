"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Define the Custom Shader Material
const CarouselDisplacementMaterial = shaderMaterial(
  {
    dispFactor: 0,
    tex: null,
    tex2: null,
    disp: null,
    effectFactor: 1.2,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float dispFactor;
    uniform float effectFactor;

    void main() {
      vec2 uv = vUv;
      
      vec4 disp = texture2D(disp, uv);
      
      float force = disp.r * effectFactor;
      
      vec2 distortedPosition = vec2(
          uv.x + dispFactor * force, 
          uv.y - dispFactor * force
      );
      vec2 distortedPosition2 = vec2(
          uv.x - (1.0 - dispFactor) * force, 
          uv.y + (1.0 - dispFactor) * force
      );

      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);

      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      
      // DEBUG: If output is black, verify UVs
      // gl_FragColor = vec4(uv, 0.0, 1.0); 
      
      gl_FragColor = finalTexture;
      // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Uncomment to test if canvas is alive
    }
  `,
);

extend({ CarouselDisplacementMaterial });

export function CarouselScene({ images, displacementImage, activeIndex }) {
  const materialRef = useRef();
  const { viewport } = useThree();

  // Load all textures
  const textures = useTexture(images);
  const dispTexture = useTexture(displacementImage); // Displacement map

  const [renderState, setRenderState] = useState({
    idx1: activeIndex,
    idx2: activeIndex,
    progress: 0,
  });

  const lastActiveIndex = useRef(activeIndex);

  useFrame((state, delta) => {
    if (materialRef.current) {
      let target = 0;
      // If we are in a transition state
      if (renderState.idx1 !== renderState.idx2) {
        target = 1;
      }

      const currentDisp = materialRef.current.dispFactor;
      const speed = 2.5; // Transition speed

      const newDisp = THREE.MathUtils.lerp(currentDisp, target, delta * speed);
      materialRef.current.dispFactor = newDisp;

      if (target === 1 && newDisp >= 0.99) {
        setRenderState({
          idx1: renderState.idx2,
          idx2: renderState.idx2,
          progress: 0,
        });
      }

      // If stable, force 0
      if (renderState.idx1 === renderState.idx2) {
        materialRef.current.dispFactor = 0;
      }
    }
  });

  // Effect to trigger transition
  useEffect(() => {
    if (activeIndex !== renderState.idx1 && activeIndex !== renderState.idx2) {
      // Trigger transition to new index
      setRenderState((prev) => ({
        idx1: prev.idx1,
        idx2: activeIndex,
        progress: 1, // Target
      }));
    }
  }, [activeIndex, renderState.idx1, renderState.idx2]);

  // Optimize textures
  useMemo(() => {
    [...textures, dispTexture].forEach((t) => {
      t.magFilter = THREE.LinearFilter;
      t.minFilter = THREE.LinearFilter;
      t.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures, dispTexture]);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <carouselDisplacementMaterial
        ref={materialRef}
        tex={textures[renderState.idx1]}
        tex2={textures[renderState.idx2]}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function WebglDisplacementCarousel({
  images,
  displacementImage = "/images/pexels-photo.jpeg",
  activeIndex,
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <React.Suspense fallback={null}>
          <CarouselScene
            images={images}
            displacementImage={displacementImage}
            activeIndex={activeIndex}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
