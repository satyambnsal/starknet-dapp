import { createClient } from "@supabase/supabase-js";

import { Community, CommunityProposal } from "../types";

import { Database } from "@/types_db";
import { cache } from "react";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const getCommunities = cache(async (): Promise<Community[]> => {
  const { data, error } = await supabaseClient.from("communities").select();
  console.log("data", data);
  if (error) {
    console.log(error.message);
  }
  return data || [];
});

export const getProposals = cache(
  async (contract_address: string): Promise<CommunityProposal[]> => {
    const { data, error } = await supabaseClient
      .from("community_proposals")
      .select("*")
      .eq("contract_address", contract_address);
    if (error || !data) {
      console.log(error.message);
      throw new Error("failed to fetch data");
    }
    return data;
  }
);
