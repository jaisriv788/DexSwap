import { useEffect, useState } from "react";
import useEthers from "../hooks/useEthers";
import { useSelector } from "react-redux";

function WalletOptions({ showModal }) {
  const [wallets, setWallets] = useState([]);
  const { connectWallet } = useEthers();

  const isConnected = useSelector((state) => state.user.isConnected);
  const connectedWallet = sessionStorage.getItem("walletName");

  useEffect(() => {
    let detected = [];

    function handler(event) {
      detected.push(event.detail);
      setWallets([...detected]);
    }

    window.addEventListener("eip6963:announceProvider", handler);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () =>
      window.removeEventListener("eip6963:announceProvider", handler);
  }, []);

  // useEffect(() => {
  //   console.log(isConnected);
  //   console.log(connectedWallet);
  //   console.log(wallets[0]?.info?.uuid);
  // });
  return (
    <div
      onClick={() => showModal(false)}
      className="fixed bg-black/50 backdrop-blur-sm inset-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card min-w-[380px] border border-border rounded-2xl w-full max-w-md shadow-xl animate-in fade-in-0 zoom-in-95 duration-300"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-foreground">
              Connect Wallet
            </h3>
            <button
              onClick={() => showModal(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <span className="text-muted-foreground text-lg cursor-pointer">
                ×
              </span>
            </button>
          </div>

          {/* Wallet List with Scroll */}
          <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-72 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
            {wallets.map((wallet, i) => (
              <button
                key={i}
                onClick={() => {
                  connectWallet(wallet); // ✅ useEthers handles connection
                  showModal(false);
                }}
                disabled={isConnected}
                className="flex items-center min-h-14 space-x-3 p-3 border rounded-xl shadow-sm relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:border-emerald-400 disabled:cursor-not-allowed"
              >
                {isConnected && wallet.info.name !== connectedWallet && (
                  <div className="bg-black/5 absolute inset-0 w-full h-full rounded-xl"></div>
                )}

                <img
                  src={wallet.info.icon}
                  alt={wallet.info.name}
                  className="w-10 h-10 rounded-full border shadow-sm"
                />
                <span className="font-medium text-foreground">
                  {wallet.info.name}
                </span>

                {isConnected && wallet.info.name == connectedWallet && (
                  <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Connected
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Note Section */}
          {isConnected && (
            <div className="mt-4 text-xs text-center text-muted-foreground">
              <span className="font-semibold text-foreground">Note:</span>{" "}
              Disconnect the current wallet to switch wallets.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletOptions;
