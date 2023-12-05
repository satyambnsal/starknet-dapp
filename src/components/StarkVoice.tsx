"use client";
import { Button, Container, Heading, TextArea } from "@radix-ui/themes";
import {
  useAccount,
  useBalance,
  useContract,
  useContractWrite,
  useProvider,
} from "@starknet-react/core";
import { CONTRACT_DETAILS } from "@/contract-config";
import StarkVoiceAbi from "@/abis/StarkVoice.json";

import { useMemo, useState } from "react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
// import { createHelia } from "helia";
// import { strings } from "@helia/strings";

import {
  CallData,
  RawCalldata,
  cairo,
  shortString,
  BigNumberish,
} from "starknet";
import { toast } from "sonner";

export const StarkVoiceInstance = () => {
  const { address, account } = useAccount();
  const { provider } = useProvider();
  const [title, setTitle] = useState<string | undefined>("");
  const [details, setDetails] = useState("");
  const [isTxPending, setIsTxPending] = useState(false);

  const createNewProposal = async () => {
    if (!address || !account) return;
    const response = await fetch("/api/ipfs", {
      method: "POST",
      body: JSON.stringify({ details }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.text();
    console.log(result);

    return;

    try {
      setIsTxPending(true);
      const title: RawCalldata = [
        shortString.encodeShortString("Sample title"),
        shortString.encodeShortString(" hello world"),
      ];

      console.log("address", address);

      const starkVoiceCalldata: CallData = new CallData(StarkVoiceAbi);
      const constructorData = starkVoiceCalldata.compile("constructor", {
        admin: address,
        title,
      });

      // console.log({ starkVoiceCalldata });
      // console.log("constructor calldata", constructorData);

      const deployResponse = await account.deployContract({
        classHash: CONTRACT_DETAILS.goerli.StarkVoice.classhash,
        constructorCalldata: constructorData,
      });

      console.log("#### Deploy Response #### ");
      await provider.waitForTransaction(deployResponse.transaction_hash);
      toast("Proposal deployed successfully");
    } catch (error) {
      console.log(error);
      toast(error?.toString());
    }

    setIsTxPending(false);
  };

  return (
    <div className="w-full max-w-3xl">
      <Heading>Loyalty Token</Heading>
      <p>Address: {address}</p>

      <DividerHorizontalIcon />
      <Container size="4">
        <TextArea
          color="blue"
          variant="soft"
          placeholder="Enter Proposal Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <TextArea
          color="blue"
          variant="soft"
          placeholder="Enter Proposal Details"
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          value={details}
          className="mt-4"
          rows={16}
        />

        <Button
          onClick={() => createNewProposal()}
          disabled={!address || isTxPending || !title || !details}
          mt="4"
        >
          Create New Proposal
        </Button>
      </Container>
    </div>
  );
};
