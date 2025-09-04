
function Sell({ isVisible }) {
  const handleSwapButtonClick = () => {
    console.log("Sell");
  };
  return (
    <>
      <div
        className={`transition-all duration-1500 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } mt-8 lg:mt-0 flex justify-center lg:justify-end`}
      >
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm text-muted-foreground truncate ml-2">
                  $ 0
                </span>
              </div>
              <div className="bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors duration-200">
                <div className="flex items-center space-x-3 min-w-0">
                  <button
                    onClick={() => console.log("hello")}
                    className="flex items-center space-x-2 text-foreground font-semibold text-base sm:text-lg cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0"
                  >
                    {/* <img
                      className="h-10"
                      src={tokens.find((t) => t.symbol === fromToken)?.icon}
                      alt=""
                    /> */}

                    {/* <span>{fromToken ? fromToken : "Select"}</span> */}
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    // value={fromAmount}
                    // onChange={handleFromAmountChange}
                    className="flex-1 min-w-0 bg-transparent text-xl sm:text-2xl font-bold text-foreground border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-muted-foreground/50 text-right"
                    placeholder="0.0"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSwapButtonClick}
              className={`w-full cursor-pointer text-accent-foreground py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg backdrop-blur-sm border border-accent/20`}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sell;
