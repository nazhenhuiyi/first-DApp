import { useConnectMetaMask } from "../hooks/useConnectMetaMask";
import TransferForm from "./TransferForm";
export default () => {
  const { address, balance } =
    useConnectMetaMask();
  return (
    <div>
      {address} has {balance}
      <TransferForm />
    </div>
  );
};
