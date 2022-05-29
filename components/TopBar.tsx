import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useMemo } from "react";
import styled from "styled-components";
const StyledAppBar = styled(AppBar)`
  .address {
    margin-left: auto;
    margin-right: 20px;
    max-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .button {
    margin-left: auto;
  }
`;
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
      <Button className="button" color="inherit" onClick={initialSigner}>
        Connect to MetaMask
      </Button>
    );
  } else if (!isMetaMaskInstalled) {
    connectButton = (
      <Button className="button" color="inherit">
        Please install MetaMask
      </Button>
    );
  }
  const fixedBalance = useMemo(() => {
    if (balance) {
      const comps = balance.split(".");
      let suffix = "." + comps[1].slice(0, 4);
      return comps[0] + suffix;
    }
  }, [balance]);
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">zilin's DApp</Typography>
        {address ? (
          <Typography variant="body2" className="address">
            {address}
          </Typography>
        ) : null}
        {balance ? (
          <Typography variant="body2" className="balance">
            {fixedBalance} eth
          </Typography>
        ) : null}
        {connectButton}
      </Toolbar>
    </StyledAppBar>
  );
};
export default TopBar;
