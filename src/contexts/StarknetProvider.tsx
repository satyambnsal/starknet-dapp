"use client";
import React from "react";

import { goerli, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  alchemyProvider,
} from "@starknet-react/core";

const provider = process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY ? alchemyProvider({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY || "",
}): publicProvider();

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
      provider={provider}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
};
