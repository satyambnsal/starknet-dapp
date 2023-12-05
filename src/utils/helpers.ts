import { supabaseClient } from "./supabase-client";

type NewProposalInput = {
  details?: string;
  details_hash?: string;
  earliest: string;
  latest: string;
  title: string;
  community_id: number;
};

export const createNewCommunity = async ({
  title,
  description,
  owner_address,
}: {
  title: string;
  description: string;
  owner_address: string;
}) => {
  const { error, data } = await supabaseClient
    .from("communities")
    .insert({ title, description, owner_address });
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
