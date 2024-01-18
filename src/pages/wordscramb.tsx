import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const WordScramb: React.FC = () => {
  const commonWords = [
    "apple",
    "banana",
    "computer",
    "programming",
    "coffee",
    "mountain",
    "ocean",
    "language",
    "music",
    "sunshine",
  ];

  const [originalWord, setOriginalWord] = useState<string>("");
  const [scrambledWord, setScrambledWord] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    shuffleWord();
  }, []); // Hanya dijalankan saat komponen pertama kali dimuat

  const shuffleWord = () => {
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    const word = commonWords[randomIndex];

    // Set kata asli dan kata yang diacak
    setOriginalWord(word);
    setScrambledWord(shuffleCharacters(word));
    setUserInput("");
  };

  const shuffleCharacters = (word: string): string => {
    const shuffled = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return shuffled;
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === originalWord.toLowerCase()) {
      alert("Benar! Anda mendapatkan satu poin.");
      setScore(score + 1);
      shuffleWord();
    } else {
      alert("Salah! Coba lagi.");
    }
  };

  const resetGame = () => {
    setScore(0);
    shuffleWord();
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex-col text-center px-5">
        <h1 className="text-lg font-medium text-white text-center my-5">
          WORD SCRAMBLE
        </h1>
        <div className="card md:w-1/3 sm:w-full bg-violet-800 text-white mx-auto p-5 rounded-md">
          <h1 className="text-md font-normal">Kata yang diacak :</h1>
          <h1 className="text-sm font-normal italic">{scrambledWord}</h1>
          <input
            type="text"
            className="py-2 px-3 rounded-md my-2 w-full text-center"
            placeholder="Your Answer"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 my-2">
            <button
              className="w-full py-2 px-2 font-normal bg-violet-950 text-white rounded-md hover:bg-violet-500"
              onClick={resetGame}
            >
              Reset
            </button>
            <button
              className="w-full py-2 px-2 font-normal bg-violet-950 text-white rounded-md hover:bg-violet-500"
              onClick={checkAnswer}
            >
              Check
            </button>
            <button
              className="w-full py-2 px-2 font-normal bg-violet-950 text-white rounded-md hover:bg-violet-500"
              onClick={shuffleWord}
            >
              Next
            </button>
          </div>
          <h1 className="text-md font-normal text-white">
            Your Score : {score}
          </h1>
        </div>
      </div>
    </>
  );
};

export default WordScramb;
