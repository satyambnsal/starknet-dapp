"use client";
import React from "react";

import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  jsonRpcProvider,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
// // const provider = alchemyProvider({});

import { RpcProvider } from "starknet";
// console.log("public provider", publicProvider());

function rpc(chain: Chain) {
  return {
    nodeUrl: `https://starknet-${chain.network}.public.blastapi.io/rpc/v0_7`,
  };
}

const provider = jsonRpcProvider({ rpc });

console.log("provider", provider);

export const StarknetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
};
