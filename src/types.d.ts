export type Community = {
  community_id: number;
  created_at: string;
  description: string | null;
  owner_address: string | null;
  title: string;
  contract_address: string;
  txn_hash: string;
  eligibility_token: string;
};

export type CommunityProposal = {
  created_at: string;
  details: string | null;
  details_hash: string | null;
  earliest: string | null;
  latest: string | null;
  proposal_id: number;
  title: string;
  yes_votes: number | null;
  no_votes: number | null;
  yes_votes_title: string;
  no_votes_title: string;
  txn_hash: string;
};
