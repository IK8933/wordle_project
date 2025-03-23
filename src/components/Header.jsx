export default function Header({ resetGame }) {
  return (
    <div className="flex justify-between items-center w-full p-5 bg-gray-800 text-white border-b-4 border-gray-900">
      {/* Reset Button on the Left */}
      <button 
        onClick={resetGame} 
        className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-700"
      >
        Reset Game
      </button>

      {/* Title in the Center */}
      <div className="flex text-4xl sm:text-6xl font-sans">
        <span className="text-red-500">W</span>
        <span className="text-blue-500">o</span>
        <span className="text-green-500">r</span>
        <span className="text-yellow-500">d</span>
        <span className="text-purple-500">l</span>
        <span className="text-pink-500">e</span>
      </div>

      {/* Empty div to balance layout */}
      <div className="w-20"></div>
    </div>
  );
}