import { shortString } from "starknet";
import { supabaseClient } from "./supabase-client";

type NewProposalInput = {
  details: string;
  details_hash: string;
  title: string;
  contract_address: string;
  txn_hash: string;
  yes_votes_title: string;
  no_votes_title: string;
  proposal_id: number;
};

type NewCommunityInput = {
  title: string;
  description: string;
  owner_address: string;
  contract_address: string;
  txn_hash: string;
  eligibility_token: string;
};

type UpdateVoteInput = {
  proposal_id: number;
  yes_votes: number;
  no_votes: number;
};

export const createNewCommunity = async ({
  title,
  description,
  owner_address,
  contract_address,
  txn_hash,
  eligibility_token,
}: NewCommunityInput) => {
  const { error, data } = await supabaseClient.from("communities").insert({
    title,
    description,
    owner_address,
    contract_address,
    txn_hash,
    eligibility_token,
  });
  return { error, data };
};

export const createNewProposalApi = async ({
  title,
  details,
  details_hash,
  contract_address,
  txn_hash,
  yes_votes_title,
  no_votes_title,
  proposal_id,
}: NewProposalInput) => {
  const { error, data } = await supabaseClient
    .from("community_proposals")
    .insert({
      title,
      details,
      contract_address,
      txn_hash,
      yes_votes_title,
      no_votes_title,
      details_hash,
      proposal_id,
      yes_votes: 0,
      no_votes: 0,
    });
  return { error, data };
};

export const updateVoteApi = async ({
  proposal_id,
  yes_votes,
  no_votes,
}: UpdateVoteInput) => {
  const { error, data } = await supabaseClient
    .from("community_proposals")
    .update({
      yes_votes,
      no_votes,
    })
    .eq("proposal_id", proposal_id);
  return { error, data };
};

export const splitString = (inputString: string) => {
  const maxLength = 31;
  const maxParts = 3;

  if (inputString.length <= maxLength * maxParts) {
    // Split the string into an array of 31-character strings
    const result = [];
    for (let i = 0; i < maxParts; i++) {
      const startIndex = i * maxLength;
      const endIndex = startIndex + maxLength;
      const part = inputString.substring(startIndex, endIndex) || "";
      if (part === "") {
        result.push(12408);
      } else {
        result.push(shortString.encodeShortString(part));
      }
    }

    return result;
  } else {
    console.error(
      "Input string is too long. Max length should be 93 characters."
    );
    return [];
  }
};
