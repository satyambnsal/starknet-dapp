const fs = require('fs')
const path = require('path')

// file to generate abis

const BASE_PATH = path.resolve(__dirname, '../contracts/target/dev')
const OUTPUT_FILE_PATH = path.resolve(__dirname, '../src/abis');

const artifactFilePath = path.resolve(BASE_PATH, "cairo_contracts.starknet_artifacts.json");

try {
  let artifactContent = fs.readFileSync(artifactFilePath)
  artifactContent = JSON.parse(artifactContent)

  const contracts = artifactContent.contracts.map(({ contract_name, artifacts }) => ({
    contract_name,
    filename: artifacts.sierra
  }));

  for (let contract of contracts) {
    const { contract_name, filename } = contract;
    let content = fs.readFileSync(path.resolve(BASE_PATH, filename))

    content = JSON.parse(content)
    const abiContent = content.abi
    // console.log("abi", abiContent, content)
    fs.writeFileSync(path.resolve(OUTPUT_FILE_PATH, `${contract_name}.json`), JSON.stringify(abiContent));
  }

} catch (error) {
  console.log('Failed to generate abi for contracts', error)
}