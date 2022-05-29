import { AppBar, Toolbar, Typography, Button } from "@mui/material";

interface TopBarProps {
  address?: string;
  balance?: string;
  isMetaMaskInstalled: boolean;
  initialSigner: () => void;
}
const TopBar: React.FC<TopBarProps> = ({
  address,
  balance,
  isMetaMaskInstalled,
  initialSigner,
}) => {
  let connectButton;
  if (isMetaMaskInstalled && !address) {
    connectButton = (
      <Button color="inherit" onClick={initialSigner}>
        Connect MetaMsk
      </Button>
    );
  } else if (!isMetaMaskInstalled) {
    connectButton = <Button color="inherit">Please install MetaMask</Button>;
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">zilin's DApp</Typography>
        {address ? (
          <Typography variant="body2">
            {address}
          </Typography>
        ) : null}
        {balance ? (
          <Typography variant="body2">
            {balance} eth
          </Typography>
        ) : null}
        {connectButton}
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
