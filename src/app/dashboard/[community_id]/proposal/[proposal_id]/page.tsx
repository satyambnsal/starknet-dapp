"use client";

import { CardShimmer } from "@/components/common/CardShimmer";
import { CommunityProposal } from "@/types";
import { getProposal } from "@/utils/supabase-client";
import { Heading, Text, Button, Box, Flex, Badge } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "@starknet-react/core";
import toast from "react-hot-toast";
import { CallData, cairo } from "starknet";
import { updateVoteApi } from "@/utils/helpers";
import StarkVoiceAbi from "@/abis/StarkVoice.json";

export default function Proposal() {
  const pathName = usePathname();
  const router = useRouter();
  const pathSegments = pathName.split("/");
  const { address, account } = useAccount();
  const [isTxPending, setIsTxPending] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  console.log("path segments", pathSegments);
  const [proposal_id, _, contract_address] = pathSegments.reverse();

  const [communityProposal, setCommunityProposal] = useState<CommunityProposal>(
    {} as CommunityProposal
  );

  const {
    data: voteResult,
    isError,
    isLoading,
    error,
  } = useContractRead({
    functionName: "get_vote_status",
    args: [proposal_id],
    abi: StarkVoiceAbi,
    address: contract_address,
    watch: true,
  });
  console.log({ voteResult, isError, isLoading, error });

  useEffect(() => {
    getProposal(Number.parseInt(proposal_id))
      .then((proposal) => {
        setCommunityProposal(proposal);
      })
      .catch((err) => {
        console.error(err);
        //TODO: show toast messgae
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetch]);

  if (!communityProposal.txn_hash) {
    return <CardShimmer />;
  }

  const handleVote = async (vote: number) => {
    if (!address || !communityProposal.proposal_id) {
      return toast("Please connect your account!");
    }
    setIsTxPending(true);
    console.log("community proposal", communityProposal);
    try {
      const a: any =
        window.starknet?.account ?? window.starknet_braavos?.account;

      const result = await a.execute({
        contractAddress: contract_address,
        entrypoint: "vote",
        calldata: CallData.compile({
          proposal_id: cairo.felt(communityProposal.proposal_id),
          vote: cairo.felt(vote),
        }),
      });
      console.log("#### DEPLOY RESPONSE", result);
      if (result?.transaction_hash) {
        //   await createNewProposalApi({
        //     contract_address: contractAddress,
        //     txn_hash: result.transaction_hash,
        //     title,
        //     details,
        //     details_hash: details,
        //     yes_votes_title: yesVoteTitle,
        //     no_votes_title: noVoteTitle,
        //   });
        // }
        let yes_votes = communityProposal.yes_votes!;
        let no_votes = communityProposal.no_votes!;
        if (vote === 1) {
          yes_votes += 1;
        } else {
          no_votes += 1;
        }
        await updateVoteApi({
          proposal_id: communityProposal.proposal_id,
          yes_votes,
          no_votes,
        });
        setIsTxPending(false);
        toast("You've Voted successfully! 🔥");
      }
    } catch (err) {
      console.error(err);
      toast("Failed to vote!");
      setIsTxPending(false);
    }
  };
  const isButtonDisabled =
    !address || isTxPending || !contract_address || !proposal_id;
  return (
    <main className="flex h-screen w-full justify-center align-middle">
      <Box mx="auto" mt="9" className="max-w-2xl">
        <Flex direction="column" gap="3">
          <Heading>{communityProposal.title}</Heading>
          <Text>{communityProposal.details}</Text>

          <Heading size="4" color="grass" mt="8">
            Vote Count
          </Heading>
          <Flex gap="7">
            <Heading>
              YES:{" "}
              {voteResult ? (
                <div className="mt-4 flex gap-2 ">
                  {parseInt((voteResult as any)[0])}
                  <Badge color="green" ml="6">
                    {parseInt((voteResult as any)[2])} %
                  </Badge>
                </div>
              ) : (
                <span>Fetching from contract...</span>
              )}
            </Heading>
            <Heading>
              NO:{" "}
              {voteResult ? (
                <div className="mt-4 flex gap-2">
                  {parseInt((voteResult as any)[1])}
                  <Badge color="red" ml="6">
                    {parseInt((voteResult as any)[3])} %
                  </Badge>
                </div>
              ) : (
                <span>Fetching from contract...</span>
              )}
            </Heading>
          </Flex>
          <Heading size="4" color="grass" mt="4">
            CAST YOUR VOTE
          </Heading>
          <Flex gap="9">
            <Button
              onClick={() => handleVote(1)}
              size="3"
              className="w-48"
              disabled={isButtonDisabled}
            >
              {communityProposal.yes_votes_title}
            </Button>
            <Button
              onClick={() => handleVote(0)}
              size="3"
              className="w-48"
              disabled={isButtonDisabled}
            >
              {communityProposal.no_votes_title}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </main>
  );
}
