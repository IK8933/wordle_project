import React, { useState, useEffect } from "react";
import { fiveLetterWords } from "../fiveLetterWords";
import { Wordle, GREEN, YELLOW, BLACK } from "../index";

const getRandomWord = () => fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

const Game = () => {
  const [targetWord, ] = useState(getRandomWord());// grabbing random word from word list
  const [wordle, setWordle] = useState(new Wordle(targetWord));// creating wordle object based on that class
  const [guesses, setGuesses] = useState([]); //array
  const [input, setInput] = useState("");// input field to type word
  const [message, setMessage] = useState(""); //alert message

  useEffect(() => {
    setWordle(new Wordle(targetWord));
  }, [targetWord]); // observes the state of the inputed variable and only runs when the variable state changes
  //Empty [] means -only run when the page 1st loads, No bracket= run when anything changes or load for the 1st time

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 5) {
      setMessage("Must be a 5-letter word");
      return;
    }
    if (!fiveLetterWords.includes(input.toLowerCase())) {
      setMessage("Invalid word");
      return;
    }

    const result = wordle.checkWord(input.toLowerCase());
    setGuesses([...guesses, { word: input, result }]);
    setInput("");
    setMessage("");

    if (result.every((r) => r === GREEN)) {
      setMessage("🎉 You won! Refresh to play again.");
    }
  };

  const getColor = (status) => {
    if (status === GREEN) return "bg-green-500";
    if (status === YELLOW) return "bg-yellow-400";
    if (status === BLACK) return "bg-gray-300";
    };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Wordle Game</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5}
          className="p-2 border text-xl"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white">
          Guess
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
      <div className="space-y-2 mt-4">
        {guesses.map((guess, idx) => (
          <div key={idx} className="flex space-x-2">
            {guess.word.split("").map((letter, i) => (
              <div
                key={i}
                className={`w-10 h-10 flex items-center justify-center text-white text-xl font-bold ${getColor(guess.result[i])}`}
              >
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;