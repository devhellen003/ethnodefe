import { ConnectKitButton } from "connectkit";

import "../styles/van.css"
import "../styles/common.css"

export const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
            <button className="btn-join van-button van-button--default van-button--normal" onClick={show}>
                {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};