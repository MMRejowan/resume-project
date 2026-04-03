import React, { useState, useEffect, useRef, useCallback } from 'react';

const ScrambleText = ({ text, isHovered, isActive }) => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef(null);

    const scramble = useCallback(() => {
        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    }, [text, chars]);

    useEffect(() => {
        if (isHovered || isActive) {
            scramble();
        } else {
            setDisplayText(text);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHovered, isActive, text, scramble]);

    return <span>{displayText}</span>;
};

export default ScrambleText;
