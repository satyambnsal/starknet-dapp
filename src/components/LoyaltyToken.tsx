"use client";
import { Heading } from "@radix-ui/themes";
import { useAccount, useBalance, useContract } from "@starknet-react/core";
import { CONTRACT_DETAILS } from "@/contract-config";
import LoyaltyTokenAbi from "@/abis/LoyaltyToken.json";
console.log("token address", CONTRACT_DETAILS.goerli.LoyaltyToken.address);

export const LoyaltyToken = () => {
  const { address } = useAccount();
  const {
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error,
    data: balanceData,
  } = useBalance({
    token: CONTRACT_DETAILS.goerli.LoyaltyToken.address,
    address,
    watch: true,
  });
  const { contract } = useContract({
    abi: LoyaltyTokenAbi,
    address: CONTRACT_DETAILS.goerli.LoyaltyToken.address,
  });

  return (
    <div>
      <Heading>Loyalty Token</Heading>
      <p>Address: {contract?.address}</p>
      <p>
        Balance:{" "}
        {isBalanceLoading ? (
          <span>Loading...</span>
        ) : (
          <span>
            {balanceData?.value.toString()} {balanceData?.symbol}
          </span>
        )}
      </p>
      {isBalanceError && <p>{error?.message}</p>}
    </div>
  );
};
