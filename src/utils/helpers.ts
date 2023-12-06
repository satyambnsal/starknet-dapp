import { supabaseClient } from "./supabase-client";

type NewProposalInput = {
  details?: string;
  details_hash?: string;
  earliest: string;
  latest: string;
  title: string;
  community_id: number;
};

type NewCommunityInput = {
  title: string;
  description: string;
  owner_address: string;
  contract_address: string;
  txn_hash: string;
  eligibility_token: string;
};

export const createNewCommunity = async ({
  title,
  description,
  owner_address,
  contract_address,
  txn_hash,
  eligibility_token,
}: NewCommunityInput) => {
  const { error, data } = await supabaseClient
    .from("communities")
    .insert({
      title,
      description,
      owner_address,
      contract_address,
      txn_hash,
      eligibility_token,
    });
  return { error, data };
};

export const createNewProposal = async ({
  title,
  details,
  details_hash,
  earliest,
  latest,
  community_id,
}: NewProposalInput) => {
  const { error, data } = await supabaseClient
    .from("community_proposals")
    .insert({
      title,
      details,
      community_id,
      details_hash,
      earliest,
      latest,
    });
  return { error, data };
};
