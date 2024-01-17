import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TictacCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`card w-3/4 mx-auto ${
        isVisible
          ? "animate__animated animate__fadeInUp"
          : "opacity-0 translate-y-5"
      }`}
    >
      <Link to="/tictactoe">
        <div className="bg-purple-900 p-5 w-1/2 mx-auto my-10 rounded-md hover:bg-purple-500">
          <h1 className="font-bold text-center text-xl text-white">
            TIC TAC TOE CHALLANGE
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default TictacCard;
