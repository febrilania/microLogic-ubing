import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SalaryCard: React.FC = () => {
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
      <Link to="/salary">
        <div className="bg-purple-900 p-5  w-full md:w-1/2 mx-auto my-10 rounded-md hover:bg-purple-500">
          <h1 className="font-bold text-center text-xl text-white">
            SALARY CALCULATION
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default SalaryCard;
