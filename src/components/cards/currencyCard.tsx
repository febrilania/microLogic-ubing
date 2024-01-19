import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CurrencyCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
      <Link to="/currency">
        <div className="bg-violet-800 hover:bg-violet-700 p-5 w-full md:w-1/2 mx-auto my-10 rounded-md flex items-center justify-center">
          <h1 className="font-medium text-center text-xl text-white">
            CURRENCY CONVERT
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default CurrencyCard;
