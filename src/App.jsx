import React, { useState } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Footer from "./components/Footer";

function App() {
  const [gameKey, setGameKey] = useState(0);

  const resetGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header resetGame={resetGame} />
      <GameBoard key={gameKey} />
      <Footer />
    </div>
  );
}

export default App;




// import Header from "./components/Header";
// import GameBoard from "./components/GameBoard";
// import Footer from "./components/Footer"; 

// function App() {
//   return (
//     <div className="flex flex-col items-center min-h-screen">
//       <Header />
//       <GameBoard />
//       <Footer /> 
//     </div>
//   );
// }

// export default App;
