export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white flex justify-center sm:justify-end items-center">
      <div className="flex flex-col items-center sm:items-end">
        <a href="mailto:Iankessack1989@gmail.com" className="text-blue-400 hover:text-blue-600 mb-2">
          Iankessack1989@gmail.com
        </a>
        <a href="https://github.com/IK8933" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
          GitHub: IK8933
        </a>
      </div>
    </div>
  );
}
