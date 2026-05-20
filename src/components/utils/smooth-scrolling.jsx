"use client";
import { ReactLenis } from "lenis/react";

function SmoothScrolling({ children }) {
    return (
        <ReactLenis root options={{ lerp: 0.15, duration: 1.5, smoothTouch: false }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
