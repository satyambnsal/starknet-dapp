"use client";
import {
  Button,
  Flex,
  Heading,
  TextArea,
  TextField,
  Text,
} from "@radix-ui/themes";
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
import { AwesomeModal } from "./common/Modal";

export const CreateCommunity = () => {
  const { address, account } = useAccount();
  const { provider } = useProvider();
  const [title, setTitle] = useState<string | undefined>("");
  const [details, setDetails] = useState("");
  const [eligibilityToken, setEligibilityToken] = useState("");

  const [isTxPending, setIsTxPending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const createNewProposal = async () => {
    if (!address || !account || !title || !details || !eligibilityToken) return;

    // const response = await fetch("/api/ipfs", {
    //   method: "POST",
    //   body: JSON.stringify({ details }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const result = response.text();
    // console.log(result);

    try {
      setIsTxPending(true);
      console.log("data", { address, title, eligibilityToken, details });

      const starkVoiceCalldata: CallData = new CallData(StarkVoiceAbi);
      const constructorData = starkVoiceCalldata.compile("constructor", {
        eligibility_token: eligibilityToken,
        admin: address,
        title: shortString.encodeShortString(title),
      });

      // console.log({ starkVoiceCalldata });
      // console.log("constructor calldata", constructorData);
      const a: any = window.starknet_braavos?.account;
      const deployResponse = await a.deploy({
        classHash: CONTRACT_DETAILS.goerli.StarkVoice.classhash,
        constructorCalldata: constructorData,
      });

      console.log("#### Deploy Response #### ", deployResponse);
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
      <AwesomeModal
        isOpen={showModal}
        onToggle={() => {
          setShowModal(!showModal);
        }}
        title="Create a New Community"
      >
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextArea
              color="blue"
              variant="soft"
              placeholder="Enter Space Name"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              color="blue"
              variant="soft"
              placeholder="Enter Space Description"
              onChange={(e) => {
                setDetails(e.target.value);
              }}
              value={details}
              className="mt-4"
              rows={16}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Vote Token(Eligibility Token)
            </Text>
            <TextArea
              color="blue"
              variant="soft"
              placeholder="Enter ERC20 Token address"
              onChange={(e) => {
                setEligibilityToken(e.target.value);
              }}
              value={eligibilityToken}
            />
          </label>
          <Button
            onClick={() => createNewProposal()}
            disabled={!address || isTxPending || !title || !details}
            mt="4"
          >
            Submit
          </Button>
        </Flex>
      </AwesomeModal>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Create New Space
      </Button>

      <DividerHorizontalIcon />
    </div>
  );
};
