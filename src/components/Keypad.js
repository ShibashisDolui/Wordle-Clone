import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleKeyup, turn, isCorrect }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setLetters(json);
      });
  }, []);

  const handleClick = (key) => {
    // Call the onKeyClick callback function passed via props with the key value as an argument.
    if (turn <= 5 && !isCorrect) {
      handleKeyup({ key: key });
    }
  };

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div
              key={letter.key}
              className={color}
              onClick={() => handleClick(letter.key)}
            >
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
