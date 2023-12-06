"use client";

import { CardShimmer } from "@/components/common/CardShimmer";
import { CommunityProposal } from "@/types";
import { getProposal } from "@/utils/supabase-client";
import { Heading, Text, Button, Box, Flex } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import toast from "react-hot-toast";
import { CallData, cairo } from "starknet";
import { updateVoteApi } from "@/utils/helpers";

export default function Proposal() {
  const pathName = usePathname();
  const router = useRouter();
  const pathSegments = pathName.split("/");
  const { address, account } = useAccount();
  const [isTxPending, setIsTxPending] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  console.log("path segments", pathSegments);
  const [txn_hash, _, contract_address] = pathSegments.reverse();

  const [communityProposal, setCommunityProposal] = useState<CommunityProposal>(
    {} as CommunityProposal
  );

  useEffect(() => {
    getProposal(txn_hash)
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
    const a: any = window.starknet_braavos?.account ?? account;
    console.log("community proposal", communityProposal);
    try {
      const a: any = window.starknet_braavos?.account ?? account;
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
  return (
    <main className="flex h-screen w-full justify-center align-middle">
      <Box mx="auto" mt="9" className="max-w-2xl">
        <Flex direction="column" gap="3">
          <Heading>{communityProposal.title}</Heading>
          <Text>{communityProposal.details}</Text>

          <Heading size="4" color="grass" mt="8">
            Vote Count
          </Heading>
          <Heading>YES: {communityProposal.yes_votes}</Heading>
          <Heading> NO: {communityProposal.no_votes}</Heading>
          <Heading size="4" color="grass" mt="4">
            CAST YOUR VOTE
          </Heading>
          <Flex gap="9">
            <Button onClick={() => handleVote(1)} size="3" className="w-48">
              {communityProposal.yes_votes_title}
            </Button>
            <Button onClick={() => handleVote(0)} size="3" className="w-48">
              {communityProposal.no_votes_title}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </main>
  );
}
