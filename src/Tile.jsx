export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block h-8 w-8 p-2 bg-purple-400 text-center"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className="inline-block h-8 w-8 p-2 bg-purple-600 text-white">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block h-8 w-8 p-2 text-purple-300">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return (
    <div
      onClick={flip}
      className=" bg-purple-300 h-[65px] w-[65px] flex justify-center items-center rounded-md transition-all duration-500 ease-in"
    ></div>
  );
}

function Front({ className, children }) {
  return (
    <div className=" bg-purple-600 h-[65px] w-[65px] p-1 flex justify-center items-center rounded-md transition-all duration-500 ease-in text-white">
      {children}
    </div>
  );
}

function Matched({ className, children }) {
  return (
    <div className=" text-purple-300 h-[65px] w-[65px] p-1 flex justify-center items-center rounded-md transition-all duration-500 ease-in">
      {children}
    </div>
  );
}
