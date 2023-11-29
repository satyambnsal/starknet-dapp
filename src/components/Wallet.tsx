"use client";
import { Button, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { connect } from "@argent/get-starknet";
import {
  Contract,
  constants as starknetConstants,
  shortString,
} from "starknet";
import { name_registry_abi } from "../abis/name_registry";

const NAME_REGISTRY_CONTRACT_ADDRESS =
  "0x01db2752c569d331c31da48762a292a30444a7c8bd3d6792897506b857f048ef";

export const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | undefined>("");
  const [domainName, setDomainName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [provider, setProvider] = useState<any>(null);

  const handleConnectWallet = async () => {
    console.log("wallet connected");
    const starknet = await connect();
    console.log(`starknet account: `, starknet?.account);
    const addr = starknet?.selectedAddress?.toString();
    setProvider(starknet?.account);
    setAddress(addr);
    if (addr) {
      await handleFetchName(addr);
    }

    // const nonce = await starknet?.account.getNonce()
    // console.log('starknet nonce: ', nonce)
    // const provider = starknet?.provider
    // const block = await provider.getBlock('latest')
    // console.log('latest block: ', block.block_number)
    // setIsConnected(true)
  };

  const handleStoreName = async () => {
    console.log(nameInput);
    const nameRegistryContract = new Contract(
      name_registry_abi,
      NAME_REGISTRY_CONTRACT_ADDRESS,
      provider
    );

    const encodedName = shortString.encodeShortString(nameInput);
    const res = await nameRegistryContract.store_name(encodedName);
    console.log("res", res);
    await provider.waitForTransaction(res.transaction_hash);
  };

  const handleFetchName = async (address: string) => {
    try {
      const nameRegistryContract = new Contract(
        name_registry_abi,
        NAME_REGISTRY_CONTRACT_ADDRESS,
        provider
      );

      const result = await nameRegistryContract.get_name(address);
      const name = shortString.decodeShortString(result);
      setDomainName(name || address);
    } catch (err) {
      console.log("Failed to fetch", err);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleConnectWallet}
        variant="solid"
        size="3"
        className="fixed right-3 top-2"
      >
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </Button>
      <div className="h-48 w-full bg-gray-50">
        {address && (
          <p className="bg-slate-400 p-6 text-lg">Hello, {domainName}</p>
        )}
      </div>
      <Separator my="3" size="3" />
      <Button
        onClick={() => {
          handleFetchName(address!)
            .then()
            .catch((err) => {
              console.error(err);
            });
        }}
        disabled={!address}
      >
        Fetch Name
      </Button>
      <Separator my="3" size="4" />

      <Flex direction="row" gap="3" align="center" justify="center">
        <TextField.Input
          placeholder="Enter Domain Name"
          type="text"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
          size="3"
          radius="small"
          className="w-full flex-1"
        />
        <Button disabled={!nameInput || !address} onClick={handleStoreName}>
          Submit
        </Button>
      </Flex>
    </div>
  );
};
