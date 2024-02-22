export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block h-8 w-8 bg-purple-400 text-center"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className="inline-block h-8 w-8 bg-purple-600 text-white">
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
        <Matched className="inline-block h-8 w-8 text-purple-300">
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
      className="h-[70px] w-[70px] flex justify-center items-center p-2 bg-purple-300 rounded-md dark:bg-slate-600 transition-all duration-500 ease-in"
    ></div>
  );
}

function Front({ className, children }) {
  return (
    <div className="h-[70px] w-[70px] flex justify-center items-center p-2 bg-purple-600 rounded-md text-white transition-all duration-500 ease-out">
      {children}
    </div>
  );
}

function Matched({ className, children }) {
  return (
    <div className="h-[70px] w-[70px] flex justify-center items-center p-2 text-purple-300 rounded-md dark:text-slate-500 transition-all duration-500 ease-in">
      {children}
    </div>
  );
}
