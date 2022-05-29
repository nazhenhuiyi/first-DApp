import { useConnectMetaMask } from "../hooks/useConnectMetaMask";

export default () => {
  const { address, balance } =
    useConnectMetaMask();
  return (
    <div>
      {address} has {balance}
    </div>
  );
};
