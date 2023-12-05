// import Image from "next/image";

import { Button, Heading, Text } from "@radix-ui/themes";
import { MyContainer } from "@/components/MyContainer";

// import backgroundImage from "@/images/background.jpg";

export function Hero() {
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
      <MyContainer className="relative">
        <div>
          <div className="mx-auto max-w-4xl lg:max-w-4xl lg:px-6">
            <h1 className="font-display text-5xl font-bold sm:text-7xl">
              <Heading className="block text-center">Stark Voice</Heading>
              <Heading className="block text-center text-3xl">
                Decentralized Voting Platform
              </Heading>
            </h1>
            <Text className="font-display mt-10 space-y-6 text-2xl tracking-wide">
              Welcome to our innovative Decentralized Voting Platform, a
              cutting-edge system designed to empower users by providing a
              secure and transparent way to participate in decision-making
              processes. This platform leverages blockchain technology to ensure
              trust, transparency, and efficiency in voting on various
              proposals. This platform will primarily be available to Starknet
            </Text>

            <Button href="#" className="mt-10 w-full sm:hidden">
              Join us!
            </Button>
            {/* <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['Speakers', '18'],
              ['People Attending', '2,091'],
              ['Venue', 'Staples Center'],
              ['Location', 'Los Angeles'],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-blue-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl> */}
          </div>

          <div className="mt-20 hidden w-full justify-center sm:flex lg:grow lg:basis-0 ">
            <Button href="#" className="px-10">
              Send your postcard!
            </Button>
          </div>
        </div>
      </MyContainer>
    </div>
  );
}
