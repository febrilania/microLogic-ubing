// src/components/Tictacbox.tsx
import React, { useState } from "react";
import TictacBox from "../components/tictacbox";
import Navbar from "../components/navbar";

const Tictactoe: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(
    Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (index: number): void => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = (): void => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index: number): JSX.Element => (
    <TictacBox value={squares[index]} onClick={() => handleClick(index)} />
  );

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `NEXT PLAYER : ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-center mt-5 text-purple-900 font-poppins">
        TIC TAC TOE
      </h1>
      <div className="w-64 p-5 shadow-md bg-purple-200 shadow-purple-900 rounded-md border border-purple-900 mx-auto mt-5 font-poppins">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-purple-900 col-span-3 text-center text-xl font-bold mb-2 mx-auto">
            {status}
          </div>
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="">
              {renderSquare(index)}
            </div>
          ))}
        </div>
        <button
          className="bg-purple-900 text-white py-2 px-9 mt-5 text-center rounded hover:bg-purple-500 font-bold"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </>
  );
};

const calculateWinner = (squares: Array<string | null>): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Tictactoe;
