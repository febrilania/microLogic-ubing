import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

interface AnimalCard {
  id: number;
  image: string;
  isFlipped: boolean;
}

const Matching: React.FC = () => {
  const [animalCards, setAnimalCards] = useState<AnimalCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [timer, setTimer] = useState<number>(300); // 5 menit dalam detik
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimalImages = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random/8"
        );
        const dogImages = response.data.message;

        const duplicatedImages = [...dogImages, ...dogImages];
        const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);

        const initialAnimalCards: AnimalCard[] = shuffledImages.map(
          (image: string, index: number) => ({
            id: index,
            image,
            isFlipped: false,
          })
        );

        setAnimalCards(initialAnimalCards);
      } catch (error) {
        console.error("Error fetching animal images:", error);
      }
    };

    fetchAnimalImages();
  }, []);

  const handleCardClick = (id: number) => {
    if (isGameOver || !isGameStarted) return; // Jika permainan belum dimulai atau sudah selesai, abaikan klik

    const clickedCard = animalCards.find((card) => card.id === id);

    if (clickedCard && !clickedCard.isFlipped && flippedCards.length < 2) {
      const updatedCards = animalCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      );
      setAnimalCards(updatedCards);
      setFlippedCards((prevFlipped) => [...prevFlipped, id]);

      if (flippedCards.length === 1) {
        setTimeout(() => {
          handleMatch();
        }, 1000);
      }
    }
  };

  const handleMatch = () => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;

      if (animalCards[firstCardId].image === animalCards[secondCardId].image) {
        // Matched! Keep cards face up
        setMatchedPairs((prevPairs) => prevPairs + 1);
        setFlippedCards([]);
      } else {
        // Not matched. Flip cards back after a delay
        setTimeout(() => {
          const updatedCards = animalCards.map((card) =>
            flippedCards.includes(card.id)
              ? { ...card, isFlipped: false }
              : card
          );
          setAnimalCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        handleMatch();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs === animalCards.length / 2) {
      // Semua pasangan telah ditemukan, hentikan permainan
      setIsGameOver(true);
    }
  }, [matchedPairs, animalCards]);

  useEffect(() => {
    let interval: number | undefined;

    if (timer > 0 && !isGameOver && isGameStarted) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      // Waktu habis, hentikan permainan
      setIsGameOver(true);
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [timer, isGameOver, isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const resetGame = () => {
    setIsGameOver(false);
    setIsGameStarted(false);
    setMatchedPairs(0);
    setTimer(300); // 5 menit dalam detik
    setFlippedCards([]);
    const shuffledImages = animalCards.map((card) => ({
      ...card,
      isFlipped: false,
    }));
    setAnimalCards(shuffledImages.sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <Navbar />
      <div className="p-5">
        <h1 className="text-xl font-bold font-poppins text-center text-purple-900 my-5">
          MATCHING CARD
        </h1>

        <div className="mx-auto w-full py-5 md:w-1/2 grid grid-cols-4 gap-2 justify-items-center bg-purple-200 shadow-md shadow-purple-900 border border-purple-900">
          {animalCards.map((card) => (
            <div
              key={card.id}
              className={`w-20 h-20 md:w-24 md:h-24 border border-purple-900 bg-white flex items-center cursor-pointer`}
              onClick={() => handleCardClick(card.id)}
            >
              {card.isFlipped ? (
                <img
                  src={card.image}
                  alt={`Card ${card.id}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <h1 className="mx-auto text-2xl font-extrabold">?</h1>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <p>Matched Pairs: {matchedPairs}</p>
          <p>Time Left: {timer} seconds</p>
          {isGameOver && <p>Game Over!</p>}
          {!isGameStarted && (
            <button
              className="bg-green-500 rounded-md text-white p-2 my-2 mr-2"
              onClick={startGame}
            >
              Start Game
            </button>
          )}
          <button
            className="bg-purple-500 rounded-md text-white p-2 my-2 ml-2"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </>
  );
};

export default Matching;
