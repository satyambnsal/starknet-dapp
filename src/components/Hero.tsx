// import Image from "next/image";

import { Button, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { MyContainer } from "@/components/MyContainer";
import { useRouter } from "next/navigation";

// import backgroundImage from "@/images/background.jpg";

export function Hero() {
  const router = useRouter();
  return (
    <div className="relative pb-20 pt-10 sm:py-24">
      {/* <div className="bg-indigo-50 absolute inset-x-0 -bottom-14 -top-48 overflow-hidden">
        <Image
          className="absolute left-0 top-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src={backgroundImage}
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="from-white absolute inset-x-0 top-0 h-40 bg-gradient-to-b" />
        <div className="from-white absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t" />
      </div> */}
      <Flex
        direction="column"
      className="mx-auto max-w-4xl lg:max-w-4xl lg:px-6"
        align="center"
      >
        <h1 className="font-display text-5xl font-bold sm:text-7xl">
          <Heading className="block text-center">Stark Voice</Heading>
          <Heading className="block text-center text-3xl">
            Decentralized Voting Platform on Starknet
          </Heading>
        </h1>
        <Text className="font-display space-y-6 text-2xl tracking-wide" mt="8">
          Welcome to our innovative Decentralized Voting Platform, a
          cutting-edge system designed to empower users by providing a secure
          and transparent way to participate in decision-making processes. This
          platform leverages blockchain technology to ensure trust,
          transparency, and efficiency in voting on various proposals. This
          platform will primarily be available to Starknet.
        </Text>
        <Button
          onClick={() => router.push("/dashboard")}
          className="w-64 cursor-pointer"
          size="3"
          mt="9"
        >
          Start Now!
        </Button>
      </Flex>
    </div>
  );
}
