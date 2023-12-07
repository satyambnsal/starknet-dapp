"use client";
import { Button, Flex, TextArea, Text, Callout } from "@radix-ui/themes";
import { useAccount, useProvider } from "@starknet-react/core";
import { CONTRACT_DETAILS } from "@/contract-config";
import StarkVoiceAbi from "@/abis/StarkVoice.json";

import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
// import { createHelia } from "helia";
// import { strings } from "@helia/strings";

import { CallData, shortString } from "starknet";
import { toast } from "react-hot-toast";
import { AwesomeModal } from "./common/Modal";
import { createNewCommunity } from "@/utils/helpers";
import { Spinner } from "./common/Spinner";

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
      const a: any =
        window.starknet?.account ?? window.starknet_braavos?.account;
      const deployResponse = await a.deploy({
        classHash: CONTRACT_DETAILS.goerli.StarkVoice.classhash,
        constructorCalldata: constructorData,
      });

      if (
        deployResponse?.transaction_hash &&
        deployResponse?.contract_address
      ) {
        const { transaction_hash, contract_address } = deployResponse;
        const [contract_addr] = contract_address;
        try {
          await createNewCommunity({
            contract_address: contract_addr,
            txn_hash: transaction_hash,
            owner_address: address,
            description: details,
            title,
            eligibility_token: eligibilityToken,
          });
        } catch (err) {
          console.error(err);
          toast("Failed to Deploy");
        }
      }
      toast("Proposal deployed successfully");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast("Failed to deploy. check console for more logs!");
    }

    setIsTxPending(false);
  };

  return (
    <div className="w-full">
      <AwesomeModal
        isOpen={showModal}
        onToggle={() => {
          setShowModal(!showModal);
        }}
        title="Create a New Community"
      >
        <Flex direction="column" gap="3">
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
          </Callout.Root>
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
            <Text size="1">
              Sample ERC20:
              0x6f735bd63191f3418f3ca50cd579f536ebed7f5b13c0f94d8d137f78f4b73a6
            </Text>
            <Text size="1" className="block">
              Make sure you have these ERC20 tokens. Otherwise Deployment will
              fail!.
            </Text>
          </label>
          <Button
            onClick={() => createNewProposal()}
            disabled={!address || isTxPending || !title || !details}
            mt="4"
          >
            {isTxPending ? (
              <span className="flex items-center justify-center">
                Submitting <Spinner />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </Flex>
      </AwesomeModal>
      <Flex justify="between">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          className="mx-auto block w-96 text-center"
          mt="9"
          mx="auto"
          size="4"
        >
          Create New Space
        </Button>
      </Flex>
    </div>
  );
};
