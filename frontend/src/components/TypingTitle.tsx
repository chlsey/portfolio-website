import { useEffect, useState } from "react";


type TypingTitleProps = {
    name: string;
    typingSpeed?: number;
    pauseDuration?: number;
};

function TypingTitle({ name, typingSpeed = 100, pauseDuration = 2000 }: TypingTitleProps) {
    const [typedName, setTypedName] = useState("");

    useEffect(() => {
        let currentIndex = 0;

        const intervalId = window.setInterval(() => {
            currentIndex++;
            setTypedName(name.slice(0, currentIndex));

            if (currentIndex === name.length) {
                window.clearInterval(intervalId);
            }
    }, 120);

    return () => {
        window.clearInterval(intervalId);
    };
    }, [name]);

    return (
        <h1>
            Welcome to {typedName}
            <span className="typing-cursor">|</span>
            {"'s Portfolio"}
        </h1>
    );
}

export default TypingTitle;