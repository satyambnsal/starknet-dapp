export const name_registry_abi = [
  {
    type: 'impl',
    name: 'NameRegistryV2',
    interface_name: 'cairo_contracts::name_registry_v2::INameRegistryV2',
  },
  {
    type: 'interface',
    name: 'cairo_contracts::name_registry_v2::INameRegistryV2',
    items: [
      {
        type: 'function',
        name: 'store_name',
        inputs: [{ name: 'name', type: 'core::felt252' }],
        outputs: [],
        state_mutability: 'external',
      },
      {
        type: 'function',
        name: 'get_name',
        inputs: [{ name: 'address', type: 'core::starknet::contract_address::ContractAddress' }],
        outputs: [{ type: 'core::felt252' }],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'struct',
    name: 'cairo_contracts::name_registry_v2::NameRegistryV2::Person',
    members: [
      { name: 'name', type: 'core::felt252' },
      { name: 'address', type: 'core::starknet::contract_address::ContractAddress' },
    ],
  },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [{ name: 'owner', type: 'cairo_contracts::name_registry_v2::NameRegistryV2::Person' }],
  },
  {
    type: 'event',
    name: 'cairo_contracts::name_registry_v2::NameRegistryV2::StoredName',
    kind: 'struct',
    members: [
      {
        name: 'user',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key',
      },
      { name: 'name', type: 'core::felt252', kind: 'data' },
    ],
  },
  {
    type: 'event',
    name: 'cairo_contracts::name_registry_v2::NameRegistryV2::Event',
    kind: 'enum',
    variants: [
      {
        name: 'StoredName',
        type: 'cairo_contracts::name_registry_v2::NameRegistryV2::StoredName',
        kind: 'nested',
      },
    ],
  },
]

export default name_registry_abi
