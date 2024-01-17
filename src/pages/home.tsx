import CountdownCard from "../components/cards/countdownCard";
import CurrencyCard from "../components/cards/currencyCard";
import MatchingCard from "../components/cards/matchingCard";
import MlCard from "../components/cards/mlCard";
import SalaryCard from "../components/cards/salaryCard";
import TictacCard from "../components/cards/tictacCard";
import WordscrambCard from "../components/cards/wordscrumbCard";
import DasNav from "../components/dashnav";

const Home: React.FC = () => {
  return (
    <>
      <DasNav />
      <div className="px-5">
        <SalaryCard />
        <TictacCard />
        <WordscrambCard />
        <MatchingCard />
        <MlCard />
        <CurrencyCard />
        <CountdownCard />
      </div>
    </>
  );
};
export default Home;
