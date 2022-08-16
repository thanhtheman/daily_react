import React, { useEffect, useState } from 'react';

const api_endpoint = 'http://localhost:3000/Wordle';
const WORD_LENGTH = 5;

const Wordle = () => {
  
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {

        if (isGameOver) {
            return;
        }

        if (event.key === 'Enter') {
            if (currentGuess.length !== 5) {
                return;
            }
            const newGuesses = [...guesses];
            newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
            setGuesses(newGuesses);
            setCurrentGuess('')

            const isCorrect = solution === currentGuess;
            if (isCorrect) {
                setIsGameOver(true);
            }
        }

        if(event.key === 'Backspace') {
            setCurrentGuess(currentGuess.slice(0, -1));
            return;
        }

        if (currentGuess.length >= 5) {
            return;
        }

        setCurrentGuess(oldGuess => oldGuess + event.key)
    };

    window.addEventListener('keydown', handleType);

    return () => window.addEventListener('keydown', handleType);
  }, [currentGuess, isGameOver, solution])

  useEffect(() => {
    fetchWord();
  }, [])
  
  const fetchWord = async () => {
    const response = await fetch(api_endpoint);
    const words = await response.json();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSolution(randomWord);
    return words;
  }
    return (
    <div className='board'>
        <h1>Here is the word</h1>
        <h1>{solution}</h1>
        {
            guesses.map((guess, i) => {
                const isCurrentGuess = i === guesses.findIndex(val => val == null);
                return(
                    <Line 
                    guess={isCurrentGuess ? currentGuess : guess ?? ''}
                    isFinal={!isCurrentGuess && guess != null}
                    solution={solution}
                    /> // a guess word or an empty string
                )
            })
        }
    </div>
  )
}

const Line = ({guess, isFinal, solution}) => {
    const tiles = []

    for(let i = 0; i < WORD_LENGTH; i++){
        const char = guess[i] // here we have the edgge case: what if we don't have any words? - fixing line 26
        let className = 'tile';
        if(isFinal) {
            if(char === solution[i]){
                className += 'correct';
            } else if (solution.includes(char)) {
                className += 'close';
            } else {
                className += 'incorrect';
            }
        }


        tiles.push(<div key={i} className={className}>{char}</div>)
    }
    return (
        <div className='line'>
            {tiles}
        </div>
)}

export default Wordle;