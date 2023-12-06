"use client";
import { Button, Container, Heading, TextArea } from "@radix-ui/themes";
import {
  useAccount,
  useBalance,
  useContract,
  useContractWrite,
} from "@starknet-react/core";
import { CONTRACT_DETAILS } from "@/contract-config";
import LoyaltyTokenAbi from "@/abis/LoyaltyToken.json";
import { useMemo, useState } from "react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
console.log("token address", CONTRACT_DETAILS.goerli.LoyaltyToken.address);
import { cairo } from "starknet";
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
  const [receiverAddress, setReceiverAddress] = useState("");

  const calls = useMemo(() => {
    if (!receiverAddress || !contract) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return contract.populateTransaction.transfer(
      receiverAddress,
      cairo.uint256(1000)
    );
  }, [contract, receiverAddress]);

  const { writeAsync, data, isPending } = useContractWrite({ calls });

  return (
    <Container className="w-full">
      <Heading>Stark Voice</Heading>
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

      <DividerHorizontalIcon />
      <Container>
        <TextArea
          color="blue"
          variant="soft"
          placeholder="Paste Receipient Addrss to transfer fund"
          onChange={(e) => {
            setReceiverAddress(e.target.value);
          }}
        />
        <Button onClick={() => writeAsync()} disabled={isPending} mt="4">
          Transfer
        </Button>
      </Container>
    </Container>
  );
};
