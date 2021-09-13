/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { WXDAI } from '../WXDAI'

export class WXDAI__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): WXDAI {
    return new Contract(address, _abi, signerOrProvider) as WXDAI
  }
}

const _abi = [
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [
      {
        type: 'string',
        name: '',
      },
    ],
    name: 'name',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [
      {
        type: 'bool',
        name: '',
      },
    ],
    name: 'approve',
    inputs: [
      {
        type: 'address',
        name: 'guy',
      },
      {
        type: 'uint256',
        name: 'wad',
      },
    ],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    name: 'totalSupply',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [
      {
        type: 'bool',
        name: '',
      },
    ],
    name: 'transferFrom',
    inputs: [
      {
        type: 'address',
        name: 'src',
      },
      {
        type: 'address',
        name: 'dst',
      },
      {
        type: 'uint256',
        name: 'wad',
      },
    ],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'withdraw',
    inputs: [
      {
        type: 'uint256',
        name: 'wad',
      },
    ],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [
      {
        type: 'uint8',
        name: '',
      },
    ],
    name: 'decimals',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    name: 'balanceOf',
    inputs: [
      {
        type: 'address',
        name: '',
      },
    ],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [
      {
        type: 'string',
        name: '',
      },
    ],
    name: 'symbol',
    inputs: [],
    constant: true,
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [
      {
        type: 'bool',
        name: '',
      },
    ],
    name: 'transfer',
    inputs: [
      {
        type: 'address',
        name: 'dst',
      },
      {
        type: 'uint256',
        name: 'wad',
      },
    ],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'payable',
    payable: true,
    outputs: [],
    name: 'deposit',
    inputs: [],
    constant: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    name: 'allowance',
    inputs: [
      {
        type: 'address',
        name: '',
      },
      {
        type: 'address',
        name: '',
      },
    ],
    constant: true,
  },
  {
    type: 'fallback',
    stateMutability: 'payable',
    payable: true,
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: 'src',
        indexed: true,
      },
      {
        type: 'address',
        name: 'guy',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'wad',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        type: 'address',
        name: 'src',
        indexed: true,
      },
      {
        type: 'address',
        name: 'dst',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'wad',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Deposit',
    inputs: [
      {
        type: 'address',
        name: 'dst',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'wad',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Withdrawal',
    inputs: [
      {
        type: 'address',
        name: 'src',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'wad',
        indexed: false,
      },
    ],
    anonymous: false,
  },
]
