import { useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";

function App() {
  const [gameState, setGameState] = useState("start");

  switch (gameState) {
    case "start":
      return (
        <StartScreen
          start={() => setGameState("play")}
          className="bg-pink-500"
        />
      );
    case "play":
      return <PlayScreen end={() => setGameState("start")} />;
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
