export default function Header({ resetGame }) {
  return (
<div className="flex justify-between items-center w-full p- pb-8 bg-gray-800 text-white border-b-4 border-gray-900">



      {/* Empty div to balance layout */}
      <div className="w-20"></div>

      {/* Title in the Center */}
      <div className="flex text-4xl sm:text-6xl font-sans">
        <span className="text-green-500">W</span>
        <span className="text-green-500">o</span>
        <span className="text-green-500">r</span>
        <span className="text-green-500">d</span>
        <span className="text-green-500">l</span>
        <span className="text-green-500">e</span>
      </div>

      {/* Reset Button */}
      <button 
        onClick={resetGame} 
        className="w-20 px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-lg rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
