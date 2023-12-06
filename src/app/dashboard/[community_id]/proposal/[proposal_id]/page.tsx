"use client";

import { CardShimmer } from "@/components/common/CardShimmer";
import { CommunityProposal } from "@/types";
import { getProposal } from "@/utils/supabase-client";
import { Container, Heading, Text, Button, Box } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";

export default function Proposal() {
  const pathName = usePathname();
  const router = useRouter();
  const pathSegments = pathName.split("/");
  const { address, account } = useAccount();
  const [isTxPending, setIsTxPending] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  const [txn_hash, contract_address] = pathSegments.reverse();

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
        setIsTxPending(true);
    const a: any = window.starknet_braavos?.account ?? account;

    try {
      const a: any = window.starknet_braavos?.account ?? account;
      const result = await a.execute({
        contractAddress: contractAddress,
        entrypoint: "create_proposal",
        calldata: CallData.compile({
          title: cairo.tuple(titles[0], titles[1], titles[2]),
          details_ipfs_url: cairo.tuple(titles[0], titles[1], titles[2]),
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
    <Container>
      <Heading>{communityProposal.title}</Heading>
      <Text>{communityProposal.details}</Text>

      <Box>
        <Button onClick={() => handleVote(1)}>
          {communityProposal.yes_votes_title}
        </Button>
        <Button onClick={() => handleVote(0)}>
          {communityProposal.no_votes_title}
        </Button>
      </Box>
    </Container>
  );
}
