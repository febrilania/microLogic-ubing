// src/components/TicTacBlock.tsx
import React from "react";

interface TicTacBoxProps {
  value: string | null;
  onClick: () => void;
}

const TictacBox: React.FC<TicTacBoxProps> = ({ value, onClick }) => (
  <button
    className="w-16 h-16 border bg-white p-2 text-violet-950 "
    onClick={onClick}
  >
    {value}
  </button>
);

export default TictacBox;
