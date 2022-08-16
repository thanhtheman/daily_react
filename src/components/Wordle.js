import React, { useEffect, useState } from 'react';

const api_endpoint = 'http://localhost:3000/Wordle';
const WORD_LENGTH = 5;

const Wordle = () => {
  
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  
  useEffect(() => {
    fetchWord();
  }, [])
  
  const fetchWord = async () => {
    const response = await fetch(api_endpoint);
    const words = await response.json();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSolution(randomWord)
    return words
  }
    return (
    <div className='board'>
        <h1>Here is the word</h1>
        <h1>{solution}</h1>
        {
            guesses.map(guess => {
                return(
                    <Line guess= { guess ?? '' } /> // a guess word or an empty string
                )
            })
        }
    </div>
  )
}

const Line = ({guess}) => {
    const tiles = []

    for(let i = 0; i < WORD_LENGTH; i++){
        const char = guess[i] // here we have the edgge case: what if we don't have any words? - fixing line 26
        tiles.push(<div key={i} className='tile'>{char}</div>)
    }
    return (
        <div className='line'>
            {tiles}
        </div>
)}

export default Wordle;