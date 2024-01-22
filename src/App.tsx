import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Salary from "./pages/salary";
import "animate.css";
import Tictactoe from "./pages/tictactoe";
import WordScramb from "./pages/wordscramb";
import Matching from "./pages/matching";
import Currency from "./pages/currency";
import ML from "./pages/ml";
import CountDownDuration from "./pages/countdownduration";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/salary" element={<Salary />}></Route>
        <Route path="/tictactoe" element={<Tictactoe />}></Route>
        <Route path="/wordscramb" element={<WordScramb />}></Route>
        <Route path="/matching" element={<Matching />}></Route>
        <Route path="/currency" element={<Currency />}></Route>
        <Route path="/ml" element={<ML />}></Route>
        <Route path="/count" element={<CountDownDuration />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
