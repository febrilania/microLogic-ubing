import { Link } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="w-full py-5 bg-violet-950 border-b border-violet-600 shadow-sm shadow-violet-500 text-white text-center text-2xl flex items-center justify-center">
        <Link to="/" className="hover:text-purple-300 flex items-center">
          <BsBoxArrowLeft className="mr-1" />
          <h1 className="font-bold">Dashboard</h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
