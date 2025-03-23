import { useState } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Footer from "./components/Footer";
import { fiveLetterWords } from "./fiveLetterWords";
import { Wordle } from "./index";

function App() {
  // Move state & reset function to App.jsx
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [wordle, setWordle] = useState(new Wordle(targetWord));

  function getRandomWord() {
    return fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
  }

  const resetGame = () => {
    const newTargetWord = getRandomWord();
    console.log("New target word:", newTargetWord);

    setTargetWord(newTargetWord);
    setWordle(new Wordle(newTargetWord));
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header resetGame={resetGame} /> 
      <GameBoard targetWord={targetWord} wordle={wordle} resetGame={resetGame} />
      <Footer />
    </div>
  );
}

export default App;
