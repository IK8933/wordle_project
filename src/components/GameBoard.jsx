import React, { useState, useEffect } from "react";
import { fiveLetterWords } from "../fiveLetterWords";
import { Wordle, GREEN, YELLOW, BLACK } from "../index";
import "../flipAnimation.css"; 

const getRandomWord = () => fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

export default function GameBoard() {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [wordle, setWordle] = useState(new Wordle(targetWord));
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [showLossPopup, setShowLossPopup] = useState(false);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [flippingIndexes, setFlippingIndexes] = useState([]);
  const [flippingRow, setFlippingRow] = useState(null);
  const [revealedIndexes, setRevealedIndexes] = useState({});

  useEffect(() => {
    setWordle(new Wordle(targetWord));
  }, [targetWord]);

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
    const newGuesses = [...guesses, { word: input, result }];
    setInput("");
    setMessage("");

    const currentRow = newGuesses.length - 1;
    setFlippingRow(currentRow);
    setFlippingIndexes([]);
    setRevealedIndexes({ ...revealedIndexes, [currentRow]: [] });

    result.forEach((_, i) => {
      setTimeout(() => {
        setFlippingIndexes((prev) => [...prev, i]);
      }, i * 300);

      setTimeout(() => {
        setRevealedIndexes((prev) => ({
          ...prev,
          [currentRow]: [...(prev[currentRow] || []), i]
        }));
      }, (i * 300) + 300);
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

  const resetGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setInput("");
    setMessage("");
    setShowLossPopup(false);
    setShowWinPopup(false);
    setFlippingIndexes([]);
    setFlippingRow(null);
    setRevealedIndexes({});
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
    <div className="mt-10 flex flex-col items-center">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5}
          className="p-3 border-2 border-gray-500 text-xl text-center uppercase w-52 rounded-md"
          disabled={showLossPopup || showWinPopup}
        />
        <button type="submit" className="ml-2 px-5 py-3 bg-blue-500 text-white rounded-lg text-lg" disabled={showLossPopup || showWinPopup}>
          Guess
        </button>
      </form>

      {/* Wordle Grid */}
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

      {/* Message Display */}
      {message && <p className="text-red-500 mt-2">{message}</p>}

      {/* Loss Popup */}
      {showLossPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">You LOSE!, you get NOTHING!</h2>
            <p className="mb-4">The correct word was: <strong>{targetWord}</strong></p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Win Popup */}
      {showWinPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Charlie? .....YOU WON! 🎉</h2>
            <p className="mb-4">The correct word was: <strong>{targetWord}</strong></p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}















// import React, { useState, useEffect } from "react";
// import { fiveLetterWords } from "../fiveLetterWords";
// import { Wordle, GREEN, YELLOW, BLACK } from "../index";
// import "../flipAnimation.css"; 

// const getRandomWord = () => fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];

// export default function GameBoard() {
//   const [targetWord, setTargetWord] = useState(getRandomWord());
//   const [wordle, setWordle] = useState(new Wordle(targetWord));
//   const [guesses, setGuesses] = useState([]);
//   const [input, setInput] = useState("");
//   const [message, setMessage] = useState("");
//   const [showLossPopup, setShowLossPopup] = useState(false);
//   const [showWinPopup, setShowWinPopup] = useState(false);
//   const [flippingIndexes, setFlippingIndexes] = useState([]);
//   const [flippingRow, setFlippingRow] = useState(null);
//   const [revealedIndexes, setRevealedIndexes] = useState({});

//   useEffect(() => {
//     setWordle(new Wordle(targetWord));
//   }, [targetWord]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.length !== 5) {
//       setMessage("Must be a 5-letter word");
//       return;
//     }
//     if (!fiveLetterWords.includes(input.toLowerCase())) {
//       setMessage("Invalid word");
//       return;
//     }

//     const result = wordle.checkWord(input.toLowerCase());
//     const newGuesses = [...guesses, { word: input, result }];
//     setInput("");
//     setMessage("");

//     const currentRow = newGuesses.length - 1;
//     setFlippingRow(currentRow);
//     setFlippingIndexes([]);
//     setRevealedIndexes({ ...revealedIndexes, [currentRow]: [] });

//     result.forEach((_, i) => {
//       setTimeout(() => {
//         setFlippingIndexes((prev) => [...prev, i]);
//       }, i * 300);

//       setTimeout(() => {
//         setRevealedIndexes((prev) => ({
//           ...prev,
//           [currentRow]: [...(prev[currentRow] || []), i]
//         }));
//       }, (i * 300) + 300);
//     });

//     setTimeout(() => {
//       setGuesses(newGuesses);

//       if (result.every((r) => r === GREEN)) {
//         setTimeout(() => setShowWinPopup(true), 500);
//         return;
//       }

//       if (newGuesses.length === 6) {
//         setTimeout(() => setShowLossPopup(true), 500);
//       }
//     }, result.length * 300);
//   };

//   const resetGame = () => {
//     setTargetWord(getRandomWord());
//     setGuesses([]);
//     setInput("");
//     setMessage("");
//     setShowLossPopup(false);
//     setShowWinPopup(false);
//     setFlippingIndexes([]);
//     setFlippingRow(null);
//     setRevealedIndexes({});
//   };

//   const grid = Array.from({ length: 6 }, (_, row) => {
//     const guess = guesses[row] || { word: "     ", result: ["", "", "", "", ""] };
//     return guess;
//   });

//   const getColor = (status) => {
//     if (status === GREEN) return "bg-green-500";
//     if (status === YELLOW) return "bg-yellow-400";
//     if (status === BLACK) return "bg-gray-300";
//     return "bg-gray-700";
//   };

//   return (
//     <div className="mt-10 flex flex-col items-center">
//       {/* Input Form - Moved Above Grid */}
//       <form onSubmit={handleSubmit} className="mb-4 flex">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           maxLength={5}
//           className="p-3 border-2 border-gray-500 text-xl text-center uppercase w-52 rounded-md"
//           disabled={showLossPopup || showWinPopup}
//         />
//         <button type="submit" className="ml-2 px-5 py-3 bg-blue-500 text-white rounded-lg text-lg" disabled={showLossPopup || showWinPopup}>
//           Guess
//         </button>
//       </form>

//       {/* Wordle Grid */}
//       <div className="grid grid-rows-6 gap-2">
//         {grid.map((guess, rowIdx) => (
//           <div key={rowIdx} className="flex space-x-2">
//             {guess.word.split("").map((letter, colIdx) => (
//               <div
//                 key={colIdx}
//                 className={`w-14 h-14 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-500
//                 ${rowIdx === flippingRow && flippingIndexes.includes(colIdx) ? "flip-animation" : ""}
//                 ${revealedIndexes[rowIdx]?.includes(colIdx) ? "fade-in" : ""}
//                 ${getColor(guess.result[colIdx])}`}
//               >
//                 {(rowIdx < flippingRow || (revealedIndexes[rowIdx] && revealedIndexes[rowIdx].includes(colIdx))) ? letter.toUpperCase() : ""}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Message Display */}
//       {message && <p className="text-red-500 mt-2">{message}</p>}

//       {/* Loss Popup */}
//       {showLossPopup && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//             <h2 className="text-2xl font-bold text-red-600 mb-4">You LOSE!, you get NOTHING!</h2>
//             <p className="mb-4">Good DAY sir!</p>
//             <button
//               onClick={resetGame}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//             >
//               Play Again
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Win Popup */}
//       {showWinPopup && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//             <h2 className="text-3xl font-bold text-green-600 mb-4">Charlie? .....YOU WON! 🎉</h2>
//             <p className="mb-4">I knew you would! I just knew you would!</p>
//             <button
//               onClick={resetGame}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
//             >
//               Play Again
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }