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
  lavalProvider,
} from "@starknet-react/core";

console.log("api key", process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY);
// const provider = process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY;

// const provider = publicProvider();

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
      provider={lavalProvider({ apiKey: "fbd4ea72f2a3a3f83b874c3f2eeecb09" })}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
};
