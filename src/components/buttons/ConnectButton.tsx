"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo } from "react";
import { GenericButton } from "./GenericButton";

export const ConnectButton = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return address ? (
    <GenericButton label={shortenedAddress} onClick={() => disconnect()} />
  ) : (
    <div className="flex items-center gap-4">
      <span>Choose a wallet:</span>
      <div className="flex gap-4">
        {connectors.map((connector) => (
          <GenericButton
            key={connector.id}
            label={connector.name}
            onClick={() => connect({ connector })}
          />
        ))}
      </div>
    </div>
  );
};
