import { useState } from "react";

export default function TokenModal({
  isOpen,
  onClose,
  onTokenSelect,
  tokens,
  walletBalance,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (tokenSymbol) => {
    onTokenSelect(tokenSymbol);
    setSearchTerm("");
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Select Token</h3>
            <button
              onClick={onClose}
              className="w-8 cursor-pointer h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
            >
              <span className="text-muted-foreground text-lg">×</span>
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2 px-2">
            {filteredTokens.map((token) => {
              // Find the matching balance object in walletBalance
              const balanceObj = walletBalance.find(
                (b) => b.symbol.toLowerCase() === token.symbol.toLowerCase()
              );

              return (
                <button
                  key={token.symbol}
                  onClick={() => handleTokenSelect(token.symbol)}
                  className="w-full cursor-pointer flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted hover:from-accent/20 hover:to-accent/10 border border-transparent hover:border-accent/30 transition-all duration-300 hover:shadow-lg group transform-gpu"
                  style={{ transformOrigin: "center" }}
                >
                  <img className="h-10" src={token.icon} alt="" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                      {token.symbol}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {token.name}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Balance:{" "}
                    {balanceObj ? parseFloat(balanceObj.balance).toFixed(4) : 0}
                  </div>
                </button>
              );
            })}
            
          </div>
        </div>
      </div>
    </div>
  );
}
