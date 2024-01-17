import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Salary from "./pages/salary";
import "animate.css";
import Tictactoe from "./pages/tictactoe";
import WordScramb from "./pages/wordscramb";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/salary" element={<Salary />}></Route>
        <Route path="/tictactoe" element={<Tictactoe />}></Route>
        <Route path="/wordscramb" element={<WordScramb />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
