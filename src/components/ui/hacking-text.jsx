"use client";
import { useEffect, useState, useRef } from "react";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export default function HackingText({
    text,
    className,
    as: Component = "span",
    speed = 50,
}) {
    const [displayText, setDisplayText] = useState(text || "");
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        let iteration = 0;

        clearInterval(intervalRef.current);

        // Safety check
        if (!text) {
            setDisplayText("");
            return;
        }

        setIsScrambling(true);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
                setIsScrambling(false);
            }

            iteration += 2; // Very fast reveal (2 characters per tick)
        }, speed);

        return () => clearInterval(intervalRef.current);
    }, [text, speed]);

    return (
        <Component
            className={className}
            style={{
                opacity: isScrambling ? 0.5 : 1,
                transition: "opacity 0.1s ease"
            }}
        >
            {displayText}
        </Component>
    );
}
