import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    formattedGuess.forEach((letterObj, index) => {
      if (solutionArray[index] === letterObj.key) {
        letterObj.color = "green";
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letterObj, index) => {
      if (
        solutionArray.includes(letterObj.key) &&
        letterObj.color !== "green"
      ) {
        letterObj.color = "yellow";
        solutionArray[solutionArray.indexOf(letterObj.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuess) => {
      const currentGuesses = [...prevGuess];
      currentGuesses[turn] = formattedGuess;
      return currentGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      const newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letterObj) => {
        const currentLetter = letterObj.key;
        const usedColor = newKeys[currentLetter];
        if (letterObj.color === "green") {
          newKeys[currentLetter] = "green";
        } else if (letterObj.color === "yellow" && usedColor !== "green") {
          newKeys[currentLetter] = "yellow";
        } else if (
          letterObj.color === "grey" &&
          usedColor !== "green" &&
          usedColor !== "yellow"
        ) {
          newKeys[currentLetter] = "grey";
        }
        return;
      });
      return newKeys;
    });

    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("You have used all your guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("You have already tried that word");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("Words must be 5 characters long");
        return;
      }
      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
