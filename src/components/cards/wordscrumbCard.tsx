import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const WordscrambCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`card w-full md:w-3/4 mx-auto ${
        isVisible
          ? "animate__animated animate__fadeInUp"
          : "opacity-0 translate-y-5"
      }`}
    >
      <Link to="/wordscramb">
        <div className="bg-purple-900 hover:bg-purple-500 p-5 w-full md:w-1/2 mx-auto my-10 rounded-md flex items-center justify-center border border-purple-600 shadow-md shadow-purple-900">
          <h1 className="font-bold text-center text-xl text-white">
            WORD SCRAMB
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default WordscrambCard;
