"use client";

import { Avatar, Card, Container, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCommunities } from "@/utils/supabase-client";
import { Community } from "@/types";

import { toast } from "sonner";
import { CreateCommunity } from "@/components/CreateCommunity";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { CardShimmer } from "@/components/common/CardShimmer";

export default function Dashboard() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    <Container className="mx-auto mt-10 flex max-w-md flex-col">
      <CreateCommunity />
      <DividerHorizontalIcon />
      {communities.map(({ community_id, title = "", description }) => (
        <Card key={community_id}>
          <Flex direction="column" gap="2">
            <Avatar fallback={title.charAt(0).toLocaleUpperCase()} />
            <Text mt="2" size="4">
              {title}
            </Text>
            <Text mt="2" size="3">
              {description}
            </Text>
          </Flex>
        </Card>
      ))}
      {loadingContent}
    </Container>
  );
}
