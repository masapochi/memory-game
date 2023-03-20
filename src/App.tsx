import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import type { Card } from "./types";

const cardImages: Card[] = [
  { id: "", src: "./images/helmet-1.png", matched: false },
  { id: "", src: "./images/potion-1.png", matched: false },
  { id: "", src: "./images/ring-1.png", matched: false },
  { id: "", src: "./images/scroll-1.png", matched: false },
  { id: "", src: "./images/shield-1.png", matched: false },
  { id: "", src: "./images/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  // カードをシャッフルする
  function shuffleCards(): void {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  }

  // カードを選択した時の処理
  function handleChoice(card: Card): void {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // 選択を解除してターン数を増やす
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  }

  // カードを選択した時の処理
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // 初回読み込み時にカードをシャッフルして表示する
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="max-w-[860px] mx-auto my-[40px]">
      <h1 className="mb-6 font-bold text-4xl">Memory Game</h1>
      <button
        className="bg-noe border-2 border-whtie rounded py-2 px-4 text-white font-bold cursor-pointer text-base hover:bg-[#c23866] transition-all "
        onClick={shuffleCards}
      >
        New Game
      </button>

      <p className="mt-[40px]">Turns : {turns}</p>

      <div className="grid gap-[20px] grid-cols-4 mt-[40px]">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
