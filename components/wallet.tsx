import { useConnectMetaMask } from "../hooks/useConnectMetaMask";
import TransferForm from "./TransferForm";
export default () => {
  const { address, balance, bigNumBalance, signer } = useConnectMetaMask();
  return (
    <div>
      {address} has {balance}
      <TransferForm
        balance={bigNumBalance}
        isConnected={!!address}
        signer={signer}
      />
    </div>
  );
};
