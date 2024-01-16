export const swapPoolAbi = {
  contract: {
    authors: ['unknown'],
    description:
      'Swap pool contract. May or may not be covered by a backstop pool. Conceptionally, there are two ways to temporarily disable a pool: The owner can either pause the pool, disabling deposits, swaps & backstop, or the owner can set the pool cap to zero which only prevents deposits. The former is for security incidents, the latter for phasing out a pool.',
    name: 'SwapPool',
    version: '0.0.1',
  },
  source: {
    compiler: 'solang 0.3.2',
    hash: '0x480a1345d46a94f8d4a41c5f443c00de2f6d784e8ae1ebc3ea8a8a585990872a',
    language: 'Solidity 0.3.2',
  },
  spec: {
    constructors: [
      {
        args: [
          {
            label: '_asset',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: '_slippageCurve',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: '_router',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: '_backstop',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: '_protocolTreasury',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: '_name',
            type: {
              displayName: ['string'],
              type: 5,
            },
          },
          {
            label: '_symbol',
            type: {
              displayName: ['string'],
              type: 5,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'new',
        payable: false,
        returnType: null,
        selector: '0x15c2c342',
      },
    ],
    docs: [
      'Swap pool contract. May or may not be covered by a backstop pool. Conceptionally, there are two ways to temporarily disable a pool: The owner can either pause the pool, disabling deposits, swaps & backstop, or the owner can set the pool cap to zero which only prevents deposits. The former is for security incidents, the latter for phasing out a pool.',
    ],
    environment: {
      accountId: {
        displayName: ['AccountId'],
        type: 2,
      },
      balance: {
        displayName: ['Balance'],
        type: 13,
      },
      blockNumber: {
        displayName: ['BlockNumber'],
        type: 14,
      },
      chainExtension: {
        displayName: [],
        type: 0,
      },
      hash: {
        displayName: ['Hash'],
        type: 15,
      },
      maxEventTopics: 4,
      timestamp: {
        displayName: ['Timestamp'],
        type: 14,
      },
    },
    events: [
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: 'from',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: true,
            label: 'to',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'value',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        docs: [''],
        label: 'Transfer',
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: 'owner',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: true,
            label: 'spender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'value',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        docs: [''],
        label: 'Approval',
      },
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'account',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        docs: [''],
        label: 'Paused',
      },
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'account',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        docs: [''],
        label: 'Unpaused',
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: 'previousOwner',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: true,
            label: 'newOwner',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        docs: [''],
        label: 'OwnershipTransferred',
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: 'sender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'poolSharesMinted',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'amountPrincipleDeposited',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        docs: ['emitted on every deposit'],
        label: 'Mint',
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: 'sender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'poolSharesBurned',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'amountPrincipleWithdrawn',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        docs: [
          'emitted on every withdrawal special case withdrawal using backstop liquidiity: amountPrincipleWithdrawn = 0',
        ],
        label: 'Burn',
      },
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'recipient',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'amountSwapTokens',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        docs: [
          'emitted when a backstop pool LP withdraws liquidity from swap pool only possible if swap pool coverage ratio remains >= 100%',
        ],
        label: 'BackstopDrain',
      },
      {
        args: [
          {
            docs: [],
            indexed: false,
            label: 'lpFees',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'backstopFees',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            docs: [],
            indexed: false,
            label: 'protocolFees',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        docs: ['Tracks the exact amounts of individual fees paid during a swap'],
        label: 'ChargedSwapFees',
      },
    ],
    lang_error: {
      displayName: ['SolidityError'],
      type: 18,
    },
    messages: [
      {
        args: [],
        default: false,
        docs: [''],
        label: 'name',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['string'],
          type: 5,
        },
        selector: '0x06fdde03',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'symbol',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['string'],
          type: 5,
        },
        selector: '0x95d89b41',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'decimals',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint8'],
          type: 0,
        },
        selector: '0x313ce567',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'totalSupply',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x18160ddd',
      },
      {
        args: [
          {
            label: 'account',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'balanceOf',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x70a08231',
      },
      {
        args: [
          {
            label: 'to',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'transfer',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['bool'],
          type: 4,
        },
        selector: '0xa9059cbb',
      },
      {
        args: [
          {
            label: 'owner',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'spender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'allowance',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xdd62ed3e',
      },
      {
        args: [
          {
            label: 'spender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'approve',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['bool'],
          type: 4,
        },
        selector: '0x095ea7b3',
      },
      {
        args: [
          {
            label: 'from',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'to',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'transferFrom',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['bool'],
          type: 4,
        },
        selector: '0x23b872dd',
      },
      {
        args: [
          {
            label: 'spender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'addedValue',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'increaseAllowance',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['bool'],
          type: 4,
        },
        selector: '0x39509351',
      },
      {
        args: [
          {
            label: 'spender',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: 'subtractedValue',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'decreaseAllowance',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['bool'],
          type: 4,
        },
        selector: '0xa457c2d7',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'paused',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['bool'],
          type: 4,
        },
        selector: '0x5c975abb',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'owner',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'types', 'AccountId'],
          type: 2,
        },
        selector: '0x8da5cb5b',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'renounceOwnership',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0x715018a6',
      },
      {
        args: [
          {
            label: 'newOwner',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [''],
        label: 'transferOwnership',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0xf2fde38b',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'poolCap',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xb954dc57',
      },
      {
        args: [],
        default: false,
        docs: ["Returns the pooled token's address"],
        label: 'asset',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'types', 'AccountId'],
          type: 2,
        },
        selector: '0x38d52e0f',
      },
      {
        args: [],
        default: false,
        docs: ['Returns the decimals of the pool asset'],
        label: 'assetDecimals',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint8'],
          type: 0,
        },
        selector: '0xc2d41601',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'totalLiabilities',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xf73579a9',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'reserve',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xcd3293de',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'reserveWithSlippage',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x0b09d91e',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'insuranceWithdrawalTimelock',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x0d3a7fd4',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'protocolTreasury',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'types', 'AccountId'],
          type: 2,
        },
        selector: '0x803db96d',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'backstop',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'types', 'AccountId'],
          type: 2,
        },
        selector: '0x7dea1817',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'router',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'types', 'AccountId'],
          type: 2,
        },
        selector: '0xf887ea40',
      },
      {
        args: [],
        default: false,
        docs: [''],
        label: 'slippageCurve',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'types', 'AccountId'],
          type: 2,
        },
        selector: '0xebe26b9e',
      },
      {
        args: [
          {
            label: '_durationInBlocks',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Set new insurance withdrawal time lock. Can only be called by the owner'],
        label: 'setInsuranceWithdrawalTimelock',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0xcfcc238d',
      },
      {
        args: [
          {
            label: '_maxTokens',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          'Set new upper limit of pool reserves. Will disable deposits when reached. Can always set to an amount < current reserves to temporarily restrict deposits.',
        ],
        label: 'setPoolCap',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0xd835f535',
      },
      {
        args: [
          {
            label: '_lpFeeBps',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            label: '_backstopFeeBps',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            label: '_protocolFeeBps',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Set swap fees (applied when swapping funds out of the pool)'],
        label: 'setSwapFees',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0xeb43434e',
      },
      {
        args: [],
        default: false,
        docs: ['Return the configured swap fees for this pool'],
        label: 'swapFees',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['SwapPool', 'swapFees', 'return_type'],
          type: 8,
        },
        selector: '0xb9ccf21d',
      },
      {
        args: [
          {
            label: '_depositAmount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Deposits amount of tokens into pool Will change cov ratio of pool, will increase delta to 0'],
        label: 'deposit',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['SwapPool', 'deposit', 'return_type'],
          type: 10,
        },
        selector: '0xb6b55f25',
      },
      {
        args: [
          {
            label: '_sharesToBurn',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            label: '_minimumAmount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Withdraws liquidity amount of asset ensuring minimum amount required'],
        label: 'withdraw',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['SwapPool', 'withdraw', 'return_type'],
          type: 11,
        },
        selector: '0x441a3e70',
      },
      {
        args: [
          {
            label: '_owner',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
          {
            label: '_sharesToBurn',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          'Burns LP tokens of owner, will get compensated using backstop liquidity Can only be invoked by backstop pool, disabled when pool is paused',
        ],
        label: 'backstopBurn',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xe45f37bd',
      },
      {
        args: [
          {
            label: '_amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
          {
            label: '_recipient',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [
          "For backstop pool to withdraw liquidity if swap pool's coverage ratio > 100% Can only be invoked by backstop pool",
        ],
        label: 'backstopDrain',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xc2cb15de',
      },
      {
        args: [
          {
            label: '_amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Get called by Router to deposit an amount of pool asset Can only be called by Router'],
        label: 'swapIntoFromRouter',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x4d8ea83f',
      },
      {
        args: [
          {
            label: '_amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Get a quote for the effective amount of tokens for a swap into'],
        label: 'quoteSwapInto',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x3c945248',
      },
      {
        args: [
          {
            label: '_amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['get called by Router to withdraw amount of pool asset Can only be called by Router'],
        label: 'swapOutFromRouter',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x5f79d44f',
      },
      {
        args: [
          {
            label: '_amount',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Get a quote for the effective amount of tokens, incl. slippage and fees'],
        label: 'quoteSwapOut',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x8735c246',
      },
      {
        args: [],
        default: false,
        docs: ['Pause deposits and swaps'],
        label: 'pause',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0x8456cb59',
      },
      {
        args: [],
        default: false,
        docs: ['Resume deposits and swaps'],
        label: 'unpause',
        mutates: true,
        payable: false,
        returnType: null,
        selector: '0x3f4ba83a',
      },
      {
        args: [],
        default: false,
        docs: ['returns pool coverage ratio'],
        label: 'coverage',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['SwapPool', 'coverage', 'return_type'],
          type: 12,
        },
        selector: '0xee8f6a0e',
      },
      {
        args: [],
        default: false,
        docs: [
          'Computes the excess liquidity that forms that valuation of the backstop pool is defined as b + C - B - L where - b is reserve - C is the amount of pool tokens in the pool - B is reserveWithSlippage - L is totalLiabilities',
        ],
        label: 'getExcessLiquidity',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['int256'],
          type: 9,
        },
        selector: '0xace0f0d5',
      },
      {
        args: [
          {
            label: '_liquidityProvider',
            type: {
              displayName: ['ink_primitives', 'types', 'AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: ['Return the earliest block no that insurance withdrawals are possible.'],
        label: 'insuranceWithdrawalUnlock',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0x5c6f4279',
      },
      {
        args: [
          {
            label: '_sharesToBurn',
            type: {
              displayName: ['uint256'],
              type: 3,
            },
          },
        ],
        default: false,
        docs: ['Returns the worth of an amount of pool shares (LP tokens) in underlying principle'],
        label: 'sharesTargetWorth',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['uint256'],
          type: 3,
        },
        selector: '0xcc045745',
      },
    ],
  },
  storage: {
    struct: {
      fields: [
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x00000000',
                          ty: 1,
                        },
                      },
                      name: '',
                    },
                  ],
                  name: 'AccountId',
                },
              },
              root_key: '0x00000000',
            },
          },
          name: '_owner',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000001',
                  ty: 3,
                },
              },
              root_key: '0x00000001',
            },
          },
          name: '_status',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000002',
                  ty: 4,
                },
              },
              root_key: '0x00000002',
            },
          },
          name: '_paused',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000003',
                  ty: 3,
                },
              },
              root_key: '0x00000003',
            },
          },
          name: '_balances',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000004',
                  ty: 3,
                },
              },
              root_key: '0x00000004',
            },
          },
          name: '_allowances',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000005',
                  ty: 3,
                },
              },
              root_key: '0x00000005',
            },
          },
          name: '_totalSupply',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000006',
                  ty: 5,
                },
              },
              root_key: '0x00000006',
            },
          },
          name: '_name',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000007',
                  ty: 5,
                },
              },
              root_key: '0x00000007',
            },
          },
          name: '_symbol',
        },
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x00000008',
                          ty: 1,
                        },
                      },
                      name: '',
                    },
                  ],
                  name: 'AccountId',
                },
              },
              root_key: '0x00000008',
            },
          },
          name: 'poolAsset',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000009',
                  ty: 0,
                },
              },
              root_key: '0x00000009',
            },
          },
          name: 'poolAssetDecimals',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x0000000a',
                  ty: 3,
                },
              },
              root_key: '0x0000000a',
            },
          },
          name: 'poolCap',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x0000000b',
                  ty: 3,
                },
              },
              root_key: '0x0000000b',
            },
          },
          name: 'totalLiabilities',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x0000000c',
                  ty: 3,
                },
              },
              root_key: '0x0000000c',
            },
          },
          name: 'reserve',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x0000000d',
                  ty: 3,
                },
              },
              root_key: '0x0000000d',
            },
          },
          name: 'reserveWithSlippage',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x0000000e',
                  ty: 3,
                },
              },
              root_key: '0x0000000e',
            },
          },
          name: 'insuranceWithdrawalTimelock',
        },
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x0000000f',
                          ty: 1,
                        },
                      },
                      name: '',
                    },
                  ],
                  name: 'AccountId',
                },
              },
              root_key: '0x0000000f',
            },
          },
          name: 'protocolTreasury',
        },
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x00000010',
                          ty: 1,
                        },
                      },
                      name: '',
                    },
                  ],
                  name: 'AccountId',
                },
              },
              root_key: '0x00000010',
            },
          },
          name: 'backstop',
        },
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x00000011',
                          ty: 1,
                        },
                      },
                      name: '',
                    },
                  ],
                  name: 'AccountId',
                },
              },
              root_key: '0x00000011',
            },
          },
          name: 'router',
        },
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x00000012',
                          ty: 1,
                        },
                      },
                      name: '',
                    },
                  ],
                  name: 'AccountId',
                },
              },
              root_key: '0x00000012',
            },
          },
          name: 'slippageCurve',
        },
        {
          layout: {
            root: {
              layout: {
                leaf: {
                  key: '0x00000013',
                  ty: 3,
                },
              },
              root_key: '0x00000013',
            },
          },
          name: 'latestDepositAtBlockNo',
        },
        {
          layout: {
            root: {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        leaf: {
                          key: '0x00000014',
                          ty: 6,
                        },
                      },
                      name: 'lpFeeBps',
                    },
                    {
                      layout: {
                        leaf: {
                          key: '0x00000014',
                          ty: 6,
                        },
                      },
                      name: 'backstopFeeBps',
                    },
                    {
                      layout: {
                        leaf: {
                          key: '0x00000014',
                          ty: 6,
                        },
                      },
                      name: 'protocolFeeBps',
                    },
                  ],
                  name: 'SwapFees',
                },
              },
              root_key: '0x00000014',
            },
          },
          name: 'swapFeeConfig',
        },
      ],
      name: 'SwapPool',
    },
  },
  types: [
    {
      id: 0,
      type: {
        def: {
          primitive: 'u8',
        },
        path: ['uint8'],
      },
    },
    {
      id: 1,
      type: {
        def: {
          array: {
            len: 32,
            type: 0,
          },
        },
      },
    },
    {
      id: 2,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 1,
              },
            ],
          },
        },
        path: ['ink_primitives', 'types', 'AccountId'],
      },
    },
    {
      id: 3,
      type: {
        def: {
          primitive: 'u256',
        },
        path: ['uint256'],
      },
    },
    {
      id: 4,
      type: {
        def: {
          primitive: 'bool',
        },
        path: ['bool'],
      },
    },
    {
      id: 5,
      type: {
        def: {
          primitive: 'str',
        },
        path: ['string'],
      },
    },
    {
      id: 6,
      type: {
        def: {
          primitive: 'u32',
        },
        path: ['uint32'],
      },
    },
    {
      id: 7,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'lpFeeBps',
                type: 6,
              },
              {
                name: 'backstopFeeBps',
                type: 6,
              },
              {
                name: 'protocolFeeBps',
                type: 6,
              },
            ],
          },
        },
        path: ['SwapFees'],
      },
    },
    {
      id: 8,
      type: {
        def: {
          tuple: [3, 3, 3],
        },
        path: ['SwapPool', 'swapFees', 'return_type'],
      },
    },
    {
      id: 9,
      type: {
        def: {
          primitive: 'i256',
        },
        path: ['int256'],
      },
    },
    {
      id: 10,
      type: {
        def: {
          tuple: [3, 9],
        },
        path: ['SwapPool', 'deposit', 'return_type'],
      },
    },
    {
      id: 11,
      type: {
        def: {
          tuple: [3, 9],
        },
        path: ['SwapPool', 'withdraw', 'return_type'],
      },
    },
    {
      id: 12,
      type: {
        def: {
          tuple: [3, 3],
        },
        path: ['SwapPool', 'coverage', 'return_type'],
      },
    },
    {
      id: 13,
      type: {
        def: {
          primitive: 'u128',
        },
        path: ['uint128'],
      },
    },
    {
      id: 14,
      type: {
        def: {
          primitive: 'u64',
        },
        path: ['uint64'],
      },
    },
    {
      id: 15,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 1,
              },
            ],
          },
        },
        path: ['ink_primitives', 'types', 'Hash'],
      },
    },
    {
      id: 16,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 5,
              },
            ],
          },
        },
        path: ['0x08c379a0'],
      },
    },
    {
      id: 17,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 3,
              },
            ],
          },
        },
        path: ['0x4e487b71'],
      },
    },
    {
      id: 18,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 16,
                  },
                ],
                index: 0,
                name: 'Error',
              },
              {
                fields: [
                  {
                    type: 17,
                  },
                ],
                index: 1,
                name: 'Panic',
              },
            ],
          },
        },
        path: ['SolidityError'],
      },
    },
  ],
  version: '4',
} as const;
