import React, { useMemo, useState } from "react";
import useKeyboardKeys from "./useKeyboardKeys";
interface config {
  useKeyboard?: boolean;
}

interface KeypadProps {
  password: number;
  onPasswordEntered?: (password: number, isCorrect: boolean) => void;
  config?: config;
}

const Keypad: React.FC<KeypadProps> = ({
  password,
  onPasswordEntered,
  config,
}) => {
  const keypadNumbers = useMemo(
    () => [...Array(10).keys()].map((value) => (value === 9 ? 0 : value + 1)),
    []
  );
  const [displayedNumbers, setDisplayedNumbers] = useState<number[]>([]);

  if (config?.useKeyboard) {
    const handleKeyboardKeys = (key: string) => {
      if (key === "Backspace") {
        setDisplayedNumbers([...displayedNumbers.slice(0, -1)]);
      } else if (!isNaN(Number(key))) {
        handleKeyClick(Number(key));
      }
    };

    useKeyboardKeys(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"],
      handleKeyboardKeys
    );
  }
  const handleKeyClick = (number: number) => {
    if (displayedNumbers.length >= password.toString().length - 1) {
      const enteredPassword = displayedNumbers.concat(number).join("");
      setDisplayedNumbers([]);
      const isCorrect = enteredPassword === password.toString();
      onPasswordEntered?.(Number(enteredPassword), isCorrect);
      return;
    }
    setDisplayedNumbers((prevNumbers) => [...prevNumbers, number]);
  };

  return (
    <div>
      <div>{displayedNumbers.join("")}</div>
      <div className="keys">
        {keypadNumbers.map((number, idx) => (
          <KeyButton key={idx} number={number} onClick={handleKeyClick} />
        ))}
      </div>
    </div>
  );
};

export default Keypad;

const KeyButton: React.FC<{
  number: number;
  onClick: (number: number) => void;
}> = ({ number, onClick }) => {
  return (
    <button key={number} className="key" onClick={() => onClick(number)}>
      {number}
    </button>
  );
};
