import { useCallback, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

export function useConnectMetaMask() {
  const isMetaMaskInstalled = !!window.ethereum;
  const isConnected = window.ethereum.isConnected();

  const providerRef = useRef<Web3Provider | null>(null);
  const signerRef = useRef<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  if (!providerRef.current) {
    providerRef.current = new ethers.providers.Web3Provider(window.ethereum);
  }

  const initialSigner = useCallback(async (force: boolean) => {
    if (!providerRef.current) {
      return;
    }
    if (force) {
      try {
      await providerRef.current.send("eth_requestAccounts", []);
      } catch(e: any) {
        alert(e.message);
        return;
      }
    }
    try {
      signerRef.current = providerRef.current.getSigner();
      const address = await signerRef.current.getAddress();
      const balance = await providerRef.current.getBalance(address);
      setAddress(address);
      setBalance(ethers.utils.commify(ethers.utils.formatEther(balance)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initialSigner(false);
  }, []);
  return {
    provider: providerRef.current,
    signer: signerRef.current,
    address,
    balance,
    isMetaMaskInstalled,
    initialSigner,
  };
}
