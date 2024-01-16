export const amberCurveAbi = {
  contract: {
    authors: ['unknown'],
    description: 'implementation of the 0xAmber slippage curve',
    name: 'AmberCurve',
    version: '0.0.1',
  },
  source: {
    compiler: 'solang 0.3.0',
    hash: '0x19a93fa817d5199daa422e1fb71b05f8be5e9e06c458845c1631b440ba050222',
    language: 'Solidity 0.3.0',
  },
  spec: {
    constructors: [
      {
        args: [
          {
            label: '_alpha',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_beta',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
        ],
        docs: [''],
        label: 'new',
        payable: false,
        returnType: null,
        selector: '0x19b51a53',
      },
    ],
    docs: ['implementation of the 0xAmber slippage curve\n\n'],
    events: [],
    lang_error: {
      displayName: [],
      type: 0,
    },
    messages: [
      {
        args: [],
        docs: [''],
        label: 'params',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['Params'],
          type: 1,
        },
        selector: '0xcff0ab96',
      },
      {
        args: [
          {
            label: '_reservesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_liabilitiesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_accumulatedPoolSlippage',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_depositAmount',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
        ],
        docs: ['adjusts deposit amount by slippage for a pool of a given coverage ratio\n\n'],
        label: 'effectiveDeposit',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['u256'],
          type: 0,
        },
        selector: '0x7a84126b',
      },
      {
        args: [
          {
            label: '_reservesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_liabilitiesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_accumulatedPoolSlippage',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_deltaAmount',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
        ],
        docs: [
          'adjusts amount by slippage for a swap adding liquidity to this pool total swap fee is the sum of the swap fees of each pool involved\n\n',
        ],
        label: 'effectiveSwapIn',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['u256'],
          type: 0,
        },
        selector: '0x623cbcb8',
      },
      {
        args: [
          {
            label: '_reservesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_liabilitiesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_accumulatedPoolSlippage',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_deltaAmount',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
        ],
        docs: [
          'adjusts amount by slippage for a swap draining liquidity from this pool total swap fee is the sum of the swap fees of each pool involved\n\n',
        ],
        label: 'effectiveSwapOut',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['u256'],
          type: 0,
        },
        selector: '0x84ea820f',
      },
      {
        args: [
          {
            label: '_reservesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_liabilitiesBefore',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_accumulatedPoolSlippage',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_withdrawalAmount',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
        ],
        docs: ['adjusts withdrawal amount by slippage for a pool of a given coverage ratio\n\n'],
        label: 'effectiveWithdrawal',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['u256'],
          type: 0,
        },
        selector: '0x986c43e5',
      },
      {
        args: [
          {
            label: '_reserves',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
          {
            label: '_liabilities',
            type: {
              displayName: ['u256'],
              type: 0,
            },
          },
        ],
        docs: [''],
        label: 'phi',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['u256'],
          type: 0,
        },
        selector: '0xc7d1cfa6',
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
                          ty: 0,
                        },
                      },
                      name: 'alpha',
                    },
                    {
                      layout: {
                        leaf: {
                          key: '0x00000000',
                          ty: 0,
                        },
                      },
                      name: 'beta',
                    },
                    {
                      layout: {
                        leaf: {
                          key: '0x00000000',
                          ty: 0,
                        },
                      },
                      name: 'c',
                    },
                  ],
                  name: 'Params',
                },
              },
              root_key: '0x00000000',
            },
          },
          name: 'params',
        },
      ],
      name: 'AmberCurve',
    },
  },
  types: [
    {
      id: 0,
      type: {
        def: {
          primitive: 'u256',
        },
        path: ['u256'],
      },
    },
    {
      id: 1,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'alpha',
                type: 0,
              },
              {
                name: 'beta',
                type: 0,
              },
              {
                name: 'c',
                type: 0,
              },
            ],
          },
        },
        path: ['Params'],
      },
    },
  ],
  version: '4',
} as const;
