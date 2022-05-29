import { useConnectMetaMask } from "../hooks/useConnectMetaMask";
import TransferForm from "./TransferForm";
import TopBar from "./TopBar";
export default () => {
  const {
    address,
    balance,
    bigNumBalance,
    signer,
    initialSigner,
    isMetaMaskInstalled,
  } = useConnectMetaMask();
  return (
    <div>
      <TopBar
        isMetaMaskInstalled={isMetaMaskInstalled}
        balance={balance}
        address={address}
        initialSigner={() => initialSigner(true)}
      />
      <TransferForm
        balance={bigNumBalance}
        isConnected={!!address}
        signer={signer}
      />
    </div>
  );
};
