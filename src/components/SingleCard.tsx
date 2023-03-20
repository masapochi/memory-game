/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { Card } from "../types";

type SingleCardProps = {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
};

const imgClass = "w-full border-2 border-white rounded-md";

const flipCss = (flipped: boolean) =>
  css({
    transform: flipped ? "rotateY(0deg)" : "rotateY(90deg)",
  });

export default function SingleCard({
  card,
  handleChoice,
  flipped = false,
  disabled = false,
}: SingleCardProps): JSX.Element {
  function handleClick() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="relative">
      <div>
        <img
          css={flipCss(flipped)}
          className={`${imgClass} absolute transition ease-in ${
            flipped ? "delay-200" : "delay-0"
          }`}
          src={card.src}
          alt="front"
          loading="lazy"
          decoding="async"
          data-testid="front-card"
        />
        <img
          css={flipped && css({ transform: "rotateY(90deg)" })}
          className={`${imgClass} transition ease-in ${
            flipped ? "delay-0" : "delay-200"
          }`}
          src="./images/cover.png"
          alt="back"
          loading="lazy"
          decoding="async"
          onClick={handleClick}
          data-testid="cover-card"
        />
      </div>
    </div>
  );
}
