// src/components/TicTacBlock.tsx
import React from "react";

interface TicTacBoxProps {
  value: string | null;
  onClick: () => void;
}

const TictacBox: React.FC<TicTacBoxProps> = ({ value, onClick }) => (
  <button
    className="w-16 h-16 border shadow-sm shadow-purple-800 p-2"
    onClick={onClick}
  >
    {value}
  </button>
);

export default TictacBox;
