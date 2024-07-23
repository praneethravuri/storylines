"use client";
import React, { useState, useEffect } from 'react';
import WordRotate from './magicui/word-rotate';
import styles from "@/styles/glowAnimation.module.css"

// Function to shuffle an array
const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
};

const LoadingScreen = () => {
    const [shuffledWords, setShuffledWords] = useState([]);

    useEffect(() => {
        const words = ["Write Your Own Tales", "Weave Your Own Adventures", "Create Your Own Path"];
        setShuffledWords(shuffleArray(words));
    }, []); // Empty dependency array ensures this runs only once after the initial render

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-background z-100`}>
            <WordRotate
                className="text-4xl font-bold text-black dark:text-white"
                words={shuffledWords}
            />
        </div>
    );
}

export default LoadingScreen;
