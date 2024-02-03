import { useEffect } from "react";

function useKeyboardKeys(
  keysToListen: string[],
  onKeyDown: (key: string) => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keysToListen.includes(event.key)) {
        onKeyDown(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keysToListen, onKeyDown]);
}

export default useKeyboardKeys;
