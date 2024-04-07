"use client";
import React from "react";

import { goerli, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
} from "@starknet-react/core";

console.log("api key", process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY);
// const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY;

// // const provider = alchemyProvider({});

// console.log("provider", provider);
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
      chains={[mainnet, goerli]}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
};
