import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 100, delay = 500 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStart(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (start && index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, speed, start]);

    return (
        <span className="typing-text">
            {displayedText}
            <span className="cursor">_</span>
        </span>
    );
};

export default TypingText;
