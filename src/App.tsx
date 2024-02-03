import Keypad from "./Keypad";
import "./App.css";

const App = () => {
  const config = {
    useKeyboard: false,
  };

  return (
    <div>
      <Keypad password={1122211} config={config} onPasswordEntered={() => {}} />
    </div>
  );
};

export default App;
