import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdLock } from "react-icons/io";

const CurrencyCard: React.FC = () => {
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
      <Link to="">
        <div className="bg-gray-800 p-5 w-full md:w-1/2 mx-auto my-10 rounded-md flex items-center justify-center">
          <h1 className="font-bold text-center text-xl text-white">
            CURRENCY CONVERT
          </h1>
          <IoMdLock className="w-8 h-8 ml-2 text-white" />
        </div>
      </Link>
    </div>
  );
};

export default CurrencyCard;
