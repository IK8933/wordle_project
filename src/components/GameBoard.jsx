import React, { useState, useEffect } from "react";
import { GREEN, YELLOW, BLACK } from "../index";
import "../flipAnimation.css"; 

export default function GameBoard({ targetWord, wordle, resetGame }) { 
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [showLossPopup, setShowLossPopup] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [flippingIndexes, setFlippingIndexes] = useState([]);
  const [flippingRow, setFlippingRow] = useState(null);
  const [revealedIndexes, setRevealedIndexes] = useState({});
  const [usedLetters, setUsedLetters] = useState({}); // Tracks used letters

  useEffect(() => {
    setGuesses([]);
    setInput("");
    setMessage("");
    setShowLossPopup(false);
    setShowWinPopup(false);
    setFlippingIndexes([]);
    setFlippingRow(null);
    setRevealedIndexes({});
    setUsedLetters({}); // Reset letters on new game
  }, [targetWord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 5) {
      setMessage("Must be a 5-letter word");
      return;
    }

    const result = wordle.checkWord(input.toLowerCase());
    const newGuesses = [...guesses, { word: input, result }];
    setInput("");
    setMessage("");

    const currentRow = newGuesses.length - 1;
    setFlippingRow(currentRow);
    setFlippingIndexes([]);
    setRevealedIndexes({ ...revealedIndexes, [currentRow]: [] });

    let updatedUsedLetters = { ...usedLetters };

    input.toLowerCase().split("").forEach((letter, i) => {
      if (result[i] === BLACK) {
        updatedUsedLetters[letter] = "gray";
      } else if (result[i] === YELLOW) {
        updatedUsedLetters[letter] = "yellow";
      } else if (result[i] === GREEN) {
        updatedUsedLetters[letter] = "green";
      }
    });

    setUsedLetters(updatedUsedLetters);

    result.forEach((_, i) => {
      setTimeout(() => {
        setFlippingIndexes((prev) => [...prev, i]);
      }, i * 300);

      setTimeout(() => {
        setRevealedIndexes((prev) => ({
          ...prev,
          [currentRow]: [...(prev[currentRow] || []), i],
        }));
      }, i * 300 + 300);
    });

    setTimeout(() => {
      setGuesses(newGuesses);

      if (result.every((r) => r === GREEN)) {
        setTimeout(() => setShowWinPopup(true), 500);
        return;
      }

      if (newGuesses.length === 6) {
        setTimeout(() => setShowLossPopup(true), 500);
      }
    }, result.length * 300);
  };

  const grid = Array.from({ length: 6 }, (_, row) => {
    const guess = guesses[row] || { word: "     ", result: ["", "", "", "", ""] };
    return guess;
  });

  const getColor = (status) => {
    if (status === GREEN) return "bg-green-500";
    if (status === YELLOW) return "bg-yellow-400";
    if (status === BLACK) return "bg-gray-300";
    return "bg-gray-700";
  };

  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-cover bg-center pt-24"
      style={{ 
        backgroundImage: "url('/Zen.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >  
      <div className="flex flex-col items-center space-y-4">
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={5}
            className="p-3 border-2 border-gray-500 text-xl text-center uppercase w-52 rounded-md"
            disabled={showLossPopup || showWinPopup}
          />
          <button type="submit" className="px-5 py-3 bg-blue-500 text-white rounded-lg text-lg" disabled={showLossPopup || showWinPopup}>
            Guess
          </button>
        </form>

        {/* Wordle Grid and Alphabet Tracker */}
        <div className="relative flex items-center justify-center w-full">
          
          {/* Wordle Grid */}
          <div className="p-5 border-4 border-gray-400 rounded-lg bg-transparent backdrop-blur-sm">
            <div className="grid grid-rows-6 gap-2">
              {grid.map((guess, rowIdx) => (
                <div key={rowIdx} className="flex space-x-2">
                  {guess.word.split("").map((letter, colIdx) => (
                    <div
                      key={colIdx}
                      className={`w-14 h-14 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-500
                      ${rowIdx === flippingRow && flippingIndexes.includes(colIdx) ? "flip-animation" : ""} 
                      ${revealedIndexes[rowIdx]?.includes(colIdx) ? "fade-in" : ""} 
                      ${getColor(guess.result[colIdx])}`}
                    >
                      {(rowIdx < flippingRow || (revealedIndexes[rowIdx] && revealedIndexes[rowIdx].includes(colIdx))) ? letter.toUpperCase() : ""}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Alphabet Tracker */}
          <div className="absolute top-0 left-[-220px] p-3 border-2 border-gray-500 rounded-lg bg-gray-800 w-[200px]">
            <div className="grid grid-cols-5 gap-2 text-white text-lg text-center">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <span
                  key={letter}
                  className={`px-1 ${
                    usedLetters[letter.toLowerCase()] === "gray" ? "text-gray-500 line-through" :
                    usedLetters[letter.toLowerCase()] === "yellow" ? "text-yellow-400" :
                    usedLetters[letter.toLowerCase()] === "green" ? "text-green-500" :
                    "text-white"
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Loss Popup */}
        {showLossPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">You LOSE!, you get NOTHING!</h2>
              <p className="mb-4">The correct word was: <strong>{targetWord}</strong></p>
              <button onClick={resetGame} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Win Popup */}
        {showWinPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">YOU WON! 🎉</h2>
              <p className="mb-4">The correct word was: <strong>{targetWord}</strong></p>
              <button onClick={resetGame} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                Play Again
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
