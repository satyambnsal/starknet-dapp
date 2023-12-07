"use client";
import { CommunityProposal } from "@/types";
import { getProposals } from "@/utils/supabase-client";
import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import { VOYAGER_BASE_ADDRESS } from "@/utils/constants";
// import StarkVoiceAbi from "@/abis/StarkVoice.json";

// import { StarkVoiceInstance } from "@/components/CreateCommunity";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AwesomeModal } from "@/components/common/Modal";
import { Spinner } from "@/components/common/Spinner";
import { useAccount } from "@starknet-react/core";
import { CallData, cairo, shortString } from "starknet";
import { createNewProposalApi, splitString } from "@/utils/helpers";
import toast from "react-hot-toast";

const endTimeRange = 1000000000000;

export default function Space() {
  const pathName = usePathname();
  const router = useRouter();
  const pathSegments = pathName.split("/");
  const [proposals, setProposals] = useState<CommunityProposal[]>([]);
  const contractAddress = pathSegments.reverse()[0];
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [yesVoteTitle, setYesVoteTitle] = useState("");
  const [noVoteTitle, setNoVoteTitle] = useState("");
  const [isTxPending, setIsTxPending] = useState(false);
  const { address, account } = useAccount();
  // const [startTimestamp, setStartTimestamp] = useState(Date.now());
  // const [endTimestamp, setEndTimestamp] = useState(Date.now() + endTimeRange);

  useEffect(() => {
    getProposals(contractAddress)
      .then((proposals) => {
        setProposals(proposals);
      })
      .catch((err) => {
        console.error(err);
        //TODO: show toast messgae
      });
  }, []);

  console.log("proposals", proposals);

  console.log("path name", pathName);

  const createNewProposal = async () => {
    if (!address || !title || !details || !yesVoteTitle || !noVoteTitle) {
      return;
    }
    const titles = splitString(title);
    setIsTxPending(true);
    const proposal_id = Date.now();
    console.log("proposal id", proposal_id);
    try {
      console.log("titles", titles);
      const a: any =
        window.starknet?.account ?? window.starknet_braavos?.account;

      const result = await a.execute({
        contractAddress: contractAddress,
        entrypoint: "create_proposal",
        calldata: CallData.compile({
          title: cairo.tuple(titles[0], titles[1], titles[2]),
          details_ipfs_url: cairo.tuple(titles[0], titles[1], titles[2]),
          proposal_id,
        }),
      });
      console.log("#### DEPLOY RESPONSE", result);
      toast("Proposal created successfully");
      if (result?.transaction_hash) {
        await createNewProposalApi({
          contract_address: contractAddress,
          txn_hash: result.transaction_hash,
          title,
          details,
          details_hash: details,
          yes_votes_title: yesVoteTitle,
          no_votes_title: noVoteTitle,
          proposal_id,
        });
      }
      setIsTxPending(false);
      setShowModal(false);
      toast("Successfully created a new proposal!");
    } catch (err) {
      console.error(err);
      toast("Failed to create proposal");
      setIsTxPending(false);
      setShowModal(false);
    }
  };

  return (
    <main className="text-color-indigo flex min-h-screen flex-col items-center  p-24">
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
          Create New Proposal
        </Button>
      </Flex>
      <div className="my-4 border-t border-gray-300"></div>
      <AwesomeModal
        isOpen={showModal}
        onToggle={() => {
          setShowModal(!showModal);
        }}
        title="Create a New Proposal"
      >
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Enter Proposal Title"
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
              placeholder="Enter Proposal Description"
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
              Yes Vote Title
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Enter Yes Vote Title"
              onChange={(e) => {
                setYesVoteTitle(e.target.value);
              }}
              value={yesVoteTitle}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              No Vote Title
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Enter No Vote Title"
              onChange={(e) => {
                setNoVoteTitle(e.target.value);
              }}
              value={noVoteTitle}
            />
          </label>
          {/* <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Start Timestamp(Optional)
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Voting Start Timestamp"
              onChange={(e) => {
                setStartTimestamp(+e.target.value);
              }}
              value={startTimestamp}
            />
          </label> */}
          {/* <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Voting end time (Optional)
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Voting End Timestamp"
              onChange={(e) => {
                setEndTimestamp(+e.target.value);
              }}
              value={endTimestamp}
            />
          </label> */}
          <Button
            onClick={() => createNewProposal()}
            disabled={
              !address ||
              isTxPending ||
              !title ||
              !details ||
              !yesVoteTitle ||
              !noVoteTitle
            }
            mt="4"
          >
            {isTxPending ? (
              <span>
                Submitting <Spinner />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </Flex>
      </AwesomeModal>
      {proposals.length === 0 && (
        <Flex align="start" mt="8">
          <Heading size="9"> NO PROPOSAL FOUND</Heading>
        </Flex>
      )}
      <Grid
        columns="1"
        gap="4"
        mt="6"
        className="max-w-3xl"
        justify="center"
        align="center"
      >
        {proposals.map(({ proposal_id, title = "", details, txn_hash }) => (
          <Card
            key={proposal_id}
            onClick={() =>
              router.push(
                `/dashboard/${contractAddress}/proposal/${proposal_id}`
              )
            }
            className="px-8 py-8"
          >
            <Flex direction="column" justify="center" align="center" gap="2">
              <Heading size="7" highContrast>
                {title}
              </Heading>
              <Text size="3">{details}</Text>
              <Link
                href={`${VOYAGER_BASE_ADDRESS}/tx/${txn_hash}`}
                target="_blank"
              >
                View on Voyager
              </Link>
            </Flex>
          </Card>
        ))}
      </Grid>
    </main>
  );
}
