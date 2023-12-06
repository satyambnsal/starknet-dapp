"use client";

import {
  Avatar,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCommunities } from "@/utils/supabase-client";
import { Community } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CreateCommunity } from "@/components/CreateCommunity";
import { CardShimmer } from "@/components/common/CardShimmer";
import { VOYAGER_BASE_ADDRESS } from "@/utils/constants";

export default function Dashboard() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getCommunities()
      .then((data) => {
        setCommunities(data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast(err);
      });
  }, []);
  console.log("communities: ", communities);

  const loadingContent = Array.from(
    { length: 10 },
    (_, index) => index * 10
  ).map((key) => <CardShimmer key={key} />);
  return (
    <Container className="mx-auto mt-10 flex flex-col">
      <CreateCommunity />
      <Grid columns="3" gap="3" mt="6">
        {communities.map(
          ({ community_id, title = "", description, contract_address }) => (
            <Card key={community_id}>
              <Flex
                direction="column"
                justify="center"
                align="center"
                gap="2"
                onClick={() => router.push(`/dashboard/${contract_address}`)}
              >
                <Avatar
                  fallback={title.charAt(0).toLocaleUpperCase()}
                  size="6"
                />
                <Heading size="7" highContrast>
                  {title}
                </Heading>
                <Text size="3">{description}</Text>
              </Flex>
              <Link
                href={`${VOYAGER_BASE_ADDRESS}/contract/${contract_address}`}
                target="_blank"
                className="mx-auto mt-6 block text-center"
                mt="4"
              >
                View on Voyager
              </Link>
            </Card>
          )
        )}
      </Grid>
      {loadingContent}
    </Container>
  );
}
