import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Footer from "./components/Footer"; 

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <GameBoard />
      <Footer /> 
    </div>
  );
}

export default App;
