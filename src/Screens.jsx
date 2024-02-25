import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <>
      <div className=" h-screen w-full flex flex-col justify-center items-center p-10">
        <div className="w-[320px] bg-pink-100 h-[320px] md:w-[340px] flex flex-col gap-5 justify-center items-center transition-all duration-500 ease-in rounded-lg shadow-md">
          <h1 className="text-pink-500 font-semibold text-2xl md:text-4xl">
            Memory
          </h1>
          <p className="text-pink-600 text-md">
            Flip over tiles looking for pairs
          </p>
          <button
            onClick={start}
            className="text-white w-[100px] p-1 bg-gradient-to-b from-pink-500 to-pink-600 rounded-2xl text-center shadow-sm hover:bg-pink-400"
          >
            Play
          </button>
        </div>
      </div>
    </>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [rotateDark, setRotateDark] = useState(false);


  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
} else {
      document.documentElement.classList.remove("dark");
}
  }, [theme]);

  const handleDarkmode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setRotateDark(!rotateDark);
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className={`h-screen w-full dark:bg-black ${
            theme === "dark" ? "dark-transition" : ""
          }  flex justify-center items-center flex-col gap-5 p-5 `}
        >
          <div className="flex justify-center items-center  gap-2">
            <h3 className="text-purple-600 font-semibold">Tries</h3>

            <span className="text-purple-600 bg-purple-300 font-semibold px-1 rounded-md ">
              {tryCount}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3 rounded-md bg-purple-100 p-3 transition-all duration-300 ease-in dark:bg-slate-800 ">
            {getTiles(16).map((tile, i) => (
              <Tile key={i} flip={() => flip(i)} {...tile} />
            ))}
          </div>
          <div>
            <input type="checkbox" id="switch" onClick={handleDarkmode} />
            <label htmlFor="switch">Toggle</label>
          </div>
        </div>

        <div
          className={
            "icon-con dark:rotate-[180deg] absolute  w-full h-[135vmin] flex justify-between flex-col items-center pointer-events-none transition-all duration-500"
          }
        >
          <BsFillSunFill className="text-black sun cursor-pointer text-2xl absolute top-[2%] opacity-100 transition-opacity duration-500" />
          <FaMoon className="text-white moon cursor-pointer text-2xl absolute bottom-[2%] opacity-100 transition-opacity duration-500 rotate-180" />
        </div>
      </div>
    </>
  );
}
