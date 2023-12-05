"use client";
import { Alert } from "@/components/common/Alert";
import { AwesomeModal } from "@/components/common/Modal";
import { Flex, Text, Button, TextField, Dialog } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/utils/supabase-client";
import { getCommunities } from "@/utils/supabase-client";
import { Community } from "@/types";
import { GetStaticPropsResult } from "next/types";
import { cache } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [communities, setCommunities] = useState<Community[]>([]);
  useEffect(() => {
    getCommunities()
      .then((data) => {
        setCommunities(data);
      })
      .catch((err) => {
        toast(err);
      });
  }, []);
  const [showModal, setShowModal] = useState(false);
  console.log("communities: ", communities);

  const createCommunity = async () => {
    const { error } = await supabaseClient.from("communities").insert({
      community_id: 1,
      title: "Starknet Foundation",
      description: "hello world",
      owner_address: "0x1",
    });
    console.log("error", error);
  };
  return (
    <div className="h-screen">
      <Flex
        direction="column"
        gap="2"
        justify="center"
        align="center"
        className="mt-24"
      >
        {/* <Text size="5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Button>Lets go</Button>
        <div className="mt-16">
          <Alert />
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Show modal
          </Button>
        </div> */}
        {/* <AwesomeModal
          isOpen={showModal}
          onToggle={() => {
            setShowModal(!showModal);
          }}
          title="Connect Walley"
        >
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue="Freja Johnsen"
                placeholder="Enter your full name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                defaultValue="freja@example.com"
                placeholder="Enter your email"
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end"></Flex>
        </AwesomeModal> */}
      </Flex>
      <Button onClick={createCommunity}>Create Community</Button>
    </div>
  );
}

// export async function getStaticProps(): Promise<
//   GetStaticPropsResult<{ communities: Community[] }>
// > {
//   console.log("communities: ", communities);
//   return {
//     props: {
//       communities,
//     },
//     revalidate: 60,
//   };
// }
