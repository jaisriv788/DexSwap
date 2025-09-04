import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setConnection, refresh } from "../redux/slice/userDetails";
import {
  isSuccessModalVisible,
  isErrorModalVisible,
  setSuccessMessage,
  setErrorMessage,
} from "../redux/slice/modalSlice";

export default function useEthers() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const detectedRef = useRef([]);

  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.isConnected);
  const isRefreshed = useSelector((state) => state.user.refresher);

  {
    /*--------------------------------------------------------------- */
  }
  const CHAIN_PARAMS = {
    chainId: "0x38",
    chainName: "BNB Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  };

  const switchNetwork = async (provider) => {
    try {
      if (!provider?.request) return;
      // Try switching first
      await provider.send("wallet_switchEthereumChain", [
        { chainId: CHAIN_PARAMS.chainId },
      ]);
    } catch (error) {
      // Error 4902 means chain is not added
      if (error.code === 4902) {
        await provider.send("wallet_addEthereumChain", [CHAIN_PARAMS]);
      } else {
        throw error;
      }
    }
  };
  {
    /*--------------------------------------------------------------- */
  }

  // allow setting provider externally (from WalletOptions)
  const initProvider = (injectedProvider) => {
    const newProvider = new ethers.BrowserProvider(injectedProvider);
    // console.log(newProvider);

    setProvider(newProvider);

    return newProvider;
  };

  const connectWallet = async (injectedProvider) => {
    try {
      //----------------------------------------------------------------------------------
      const activeProvider = injectedProvider?.provider
        ? initProvider(injectedProvider.provider)
        : provider || (window.ethereum ? initProvider(window.ethereum) : null);

      if (!activeProvider) throw new Error("No provider found");

      await switchNetwork(injectedProvider.provider);

      const accounts = await activeProvider.send("eth_requestAccounts", []);
      dispatch(setAddress(accounts[0]));
      sessionStorage.setItem("walletId", injectedProvider.info.uuid);
      sessionStorage.setItem("walletName", injectedProvider.info.name);
      const newSigner = await activeProvider.getSigner();
      setSigner(newSigner);

      dispatch(setConnection(true));
      dispatch(setSuccessMessage("Wallet Connected!"));
      dispatch(isSuccessModalVisible(true));
      setTimeout(() => {
        dispatch(setSuccessMessage(""));
        dispatch(isSuccessModalVisible(false));
      }, 1500);

      if (injectedProvider?.provider?.on) {
        injectedProvider.provider.on("accountsChanged", (accounts) => {
          if (accounts.length === 0) {
            sessionStorage.removeItem("walletId");
            dispatch(setConnection(false));
            dispatch(setAddress(null));
          } else {
            console.log(injectedProvider?.info.name);
            console.log(accounts[0]);
            dispatch(refresh(!isRefreshed));
            dispatch(setAddress(accounts[0]));
          }
        });
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);

      dispatch(setErrorMessage("Wallet Connection Failed!"));
      dispatch(isErrorModalVisible(true));
      setTimeout(() => {
        dispatch(setErrorMessage(""));
        dispatch(isErrorModalVisible(false));
      }, 1500);
    }
  };

  useEffect(() => {
    const walletId = sessionStorage.getItem("walletId");
    const walletName = sessionStorage.getItem("walletName");

    const handler = (event) => {
      detectedRef.current.push(event.detail);
    };

    window.addEventListener("eip6963:announceProvider", handler);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    const tryRestore = async () => {
      const providerInstance = detectedRef.current.find(
        (item) => item.info.name === walletName
      );
      await switchNetwork(providerInstance?.provider);

      if (isConnected && walletId && providerInstance) {
        try {
          const newProvider = new ethers.BrowserProvider(
            providerInstance.provider
          );
          setProvider(newProvider);

          const newSigner = await newProvider.getSigner();
          setSigner(newSigner);

          const accounts = await newProvider.listAccounts();
          if (accounts.length > 0) {
            dispatch(setAddress(accounts[0].address)); // be consistent
          }
        } catch (err) {
          console.warn("Failed to restore wallet:", err);
          dispatch(setConnection(false));
          dispatch(setAddress(null));
          sessionStorage.removeItem("walletId");
        }
      }
    };

    // wait a tick to ensure all providers are announced
    setTimeout(tryRestore, 200);

    return () => {
      window.removeEventListener("eip6963:announceProvider", handler);
    };
  }, [isConnected, dispatch]);

  // console.log(provider, signer);
  return { provider, signer, connectWallet };
}
