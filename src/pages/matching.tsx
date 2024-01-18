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

  useEffect(() => {
    const fetchAnimalImages = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random/8"
        );
        const dogImages = response.data.message;

        // Duplicating the array to create pairs of matching cards
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
        setMatchedPairs((prevPairs) => prevPairs + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setAnimalCards((prevCards) =>
            prevCards.map((card) =>
              flippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
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

  const resetGame = () => {
    // Reset state dan ambil gambar baru
    setFlippedCards([]);
    setMatchedPairs(0);

    const shuffledImages = animalCards
      .map((card) => card.image)
      .sort(() => Math.random() - 0.5);

    const resetAnimalCards: AnimalCard[] = shuffledImages.map(
      (image: string, index: number) => ({
        id: index,
        image,
        isFlipped: false,
      })
    );

    setAnimalCards(resetAnimalCards);
  };

  return (
    <>
      <Navbar />
      <div className="p-5">
        <h1 className="text-xl font-bold font-poppins text-center text-purple-900 my-5">
          MATCHING CARD
        </h1>
        <div className="mx-auto w-full p-5 md:w-1/2 grid grid-cols-4 gap-2 justify-items-center bg-purple-200 shadow-md shadow-purple-900 border border-purple-900">
          {animalCards.map((card) => (
            <div
              key={card.id}
              className={`md:w-20 md:h-20 w-14 h-14 border border-purple-900 bg-white flex items-center cursor-pointer`}
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
