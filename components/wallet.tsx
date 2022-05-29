import { useConnectMetaMask } from "../hooks/useConnectMetaMask";
import TransferForm from "./TransferForm";
export default () => {
  const { address, balance, bigNumBalance } =
    useConnectMetaMask();
  return (
    <div>
      {address} has {balance}
      <TransferForm balance={bigNumBalance} isConnected={!!address} />
    </div>
  );
};
