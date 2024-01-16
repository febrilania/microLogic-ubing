import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="navbar">
        <div className="w-full py-5 bg-purple-900 text-white text-center text-2xl">
          <Link to="/">
            <h1 className="font-bold">
              Micro<span className="italic">Logic</span>
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
