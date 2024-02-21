export const nablaCurveAbi = {
  "contract": {
    "authors": [
      "unknown"
    ],
    "description": "implementation of the Nabla slippage curve\nIt represents the function Psi(b,l) = beta * (b-l) ** 2 / (b + c * l) + b",
    "name": "NablaCurve",
    "version": "0.0.1"
  },
  "source": {
    "compiler": "solang 0.3.2",
    "hash": "0x228ecf05004b7a73783f6479db3e8125ddaaae3a25c72d70e89604d65728a0b6",
    "language": "Solidity 0.3.2"
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "_alpha",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_beta",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          }
        ],
        "default": false,
        "docs": [
          ""
        ],
        "label": "new",
        "payable": false,
        "returnType": null,
        "selector": "0x19b51a53"
      }
    ],
    "docs": [
      "implementation of the Nabla slippage curve\nIt represents the function Psi(b,l) = beta * (b-l) ** 2 / (b + c * l) + b"
    ],
    "environment": {
      "accountId": {
        "displayName": [
          "AccountId"
        ],
        "type": 6
      },
      "balance": {
        "displayName": [
          "Balance"
        ],
        "type": 7
      },
      "blockNumber": {
        "displayName": [
          "BlockNumber"
        ],
        "type": 8
      },
      "chainExtension": {
        "displayName": [],
        "type": 0
      },
      "hash": {
        "displayName": [
          "Hash"
        ],
        "type": 9
      },
      "maxEventTopics": 4,
      "timestamp": {
        "displayName": [
          "Timestamp"
        ],
        "type": 8
      }
    },
    "events": [],
    "lang_error": {
      "displayName": [
        "SolidityError"
      ],
      "type": 13
    },
    "messages": [
      {
        "args": [],
        "default": false,
        "docs": [
          ""
        ],
        "label": "params",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "NablaCurve",
            "params",
            "return_type"
          ],
          "type": 3
        },
        "selector": "0xcff0ab96"
      },
      {
        "args": [
          {
            "label": "_b",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_l",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_decimals",
            "type": {
              "displayName": [
                "uint8"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          "Calculates the output of the function Psi for input values b and l"
        ],
        "label": "psi",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "uint256"
          ],
          "type": 2
        },
        "selector": "0x44ff824c"
      },
      {
        "args": [
          {
            "label": "_b",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_l",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_capitalB",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_decimals",
            "type": {
              "displayName": [
                "uint8"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          "Given b,l and B >= Psi(b, l), this function determines the unique t>=0\nsuch that Psi(b+t, l+t) = B"
        ],
        "label": "inverseDiagonal",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "uint256"
          ],
          "type": 2
        },
        "selector": "0x79e3ddf2"
      },
      {
        "args": [
          {
            "label": "_b",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_l",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_capitalB",
            "type": {
              "displayName": [
                "uint256"
              ],
              "type": 2
            }
          },
          {
            "label": "_decimals",
            "type": {
              "displayName": [
                "uint8"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          "Given b,l and B >= Psi(b, l), this function determines the unique t>=0\nsuch that Psi(b+t, l) = B"
        ],
        "label": "inverseHorizontal",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "uint256"
          ],
          "type": 2
        },
        "selector": "0xe67b3643"
      }
    ]
  },
  "storage": {
    "struct": {
      "fields": [
        {
          "layout": {
            "root": {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "beta"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "name": "Params"
                }
              },
              "root_key": "0x00000000"
            }
          },
          "name": "params"
        }
      ],
      "name": "NablaCurve"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "i256"
        },
        "path": [
          "int256"
        ]
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "beta",
                "type": 0
              },
              {
                "name": "c",
                "type": 0
              }
            ]
          }
        },
        "path": [
          "Params"
        ]
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "primitive": "u256"
        },
        "path": [
          "uint256"
        ]
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "tuple": [
            0,
            0
          ]
        },
        "path": [
          "NablaCurve",
          "params",
          "return_type"
        ]
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "primitive": "u8"
        },
        "path": [
          "uint8"
        ]
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 4
          }
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 5
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "primitive": "u128"
        },
        "path": [
          "uint128"
        ]
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "primitive": "u64"
        },
        "path": [
          "uint64"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 5
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "primitive": "str"
        },
        "path": [
          "string"
        ]
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 10
              }
            ]
          }
        },
        "path": [
          "0x08c379a0"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 2
              }
            ]
          }
        },
        "path": [
          "0x4e487b71"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 0,
                "name": "Error"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Panic"
              }
            ]
          }
        },
        "path": [
          "SolidityError"
        ]
      }
    }
  ],
  "version": "4"
} as const;
