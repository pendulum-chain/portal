import { keccakAsHex } from '@polkadot/util-crypto';
import { findReleaseTxHash, getBaseMigrationSnapshot, isContractCode } from '../ethereum';

describe('isContractCode', () => {
  it('treats an address without code as a regular account', () => {
    expect(isContractCode('0x')).toBe(false);
    expect(isContractCode('0x0')).toBe(false);
  });

  it('treats an EIP-7702 delegated account as a regular account', () => {
    expect(isContractCode('0xef010063c0c19a282a1b52b07dd5a65b58948a07dae32b')).toBe(false);
    expect(isContractCode('0xEF010063C0C19A282A1B52B07DD5A65B58948A07DAE32B')).toBe(false);
  });

  it('treats deployed bytecode as a contract', () => {
    expect(isContractCode('0x6080604052348015600f57600080fd5b50')).toBe(true);
  });

  it('does not mistake longer code that starts like a designator for one', () => {
    expect(isContractCode('0xef010063c0c19a282a1b52b07dd5a65b58948a07dae32b00')).toBe(true);
  });
});

describe('findReleaseTxHash', () => {
  const vault = '0xB421bFBa72328Bc7F97755Eed236762a0c758C59';
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  function mockRpc(onGetLogs: (params: { fromBlock: string; toBlock: string; topics: string[] }) => unknown[]) {
    const requests: { method: string; params: unknown[] }[] = [];
    global.fetch = jest.fn(async (_url: unknown, init?: { body?: unknown }) => {
      const { method, params } = JSON.parse(String(init?.body));
      requests.push({ method, params });
      const result = method === 'eth_blockNumber' ? '0x2710' : onGetLogs(params[0]);
      return { json: async () => ({ jsonrpc: '2.0', id: 1, result }) } as Response;
    }) as unknown as typeof fetch;
    return requests;
  }

  it('queries the Released event for the nonce and returns the transaction from an older window', async () => {
    const requests = mockRpc(({ fromBlock }) => (fromBlock === '0x1771' ? [{ transactionHash: '0xabc' }] : []));
    await expect(findReleaseTxHash('https://rpc', vault, 7n)).resolves.toBe('0xabc');
    const logCalls = requests
      .filter((r) => r.method === 'eth_getLogs')
      .map((r) => r.params[0] as { topics: string[]; fromBlock: string; toBlock: string });
    expect(logCalls).toHaveLength(2);
    expect(logCalls[0].topics[0]).toBe(keccakAsHex('Released(uint64,address,uint256,uint256)', 256));
    expect(logCalls[0].topics[1]).toBe(`0x${'7'.padStart(64, '0')}`);
    expect([logCalls[0].fromBlock, logCalls[0].toBlock]).toEqual(['0x1f41', '0x2710']);
    expect([logCalls[1].fromBlock, logCalls[1].toBlock]).toEqual(['0x1771', '0x1f40']);
  });

  it('returns undefined when no window holds the release', async () => {
    mockRpc(() => []);
    await expect(findReleaseTxHash('https://rpc', vault, 7n)).resolves.toBeUndefined();
  });
});

describe('getBaseMigrationSnapshot', () => {
  const vault = '0xB421bFBa72328Bc7F97755Eed236762a0c758C59';
  const token = '0x0fc4a6ff1cdae34e1a481e4da38d402de0733955';
  const treasury = '0x74F00d5ff15f0d2526792E5939e3bC45D445Ce04';
  const word = (value: bigint) => `0x${value.toString(16).padStart(64, '0')}`;
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  function mockRpc(chainId = '0x2105') {
    const calls: { to: string; data: string; block: string }[] = [];
    global.fetch = jest.fn(async (_url: unknown, init?: { body?: unknown }) => {
      const { method, params } = JSON.parse(String(init?.body));
      let result: string = chainId;
      if (method === 'eth_blockNumber') result = '0x2710';
      if (method === 'eth_call') {
        const [{ to, data }, block] = params;
        calls.push({ to, data, block });
        result =
          {
            '0x5c975abb': word(0n), // paused()
            '0xfc0c546a': word(BigInt(token)), // token()
            '0xe33b7de3': word(200n * 10n ** 18n), // totalReleased()
          }[data as string] ?? word(100n * 10n ** 18n); // balanceOf(treasury)
      }
      return { json: async () => ({ jsonrpc: '2.0', id: 1, result }) } as Response;
    }) as unknown as typeof fetch;
    return calls;
  }

  it('reads every value at the same block', async () => {
    const calls = mockRpc();
    await expect(getBaseMigrationSnapshot('https://rpc', vault, treasury, '0x2105')).resolves.toEqual({
      blockNumber: 10_000n,
      paused: false,
      token,
      totalReleased: 200n * 10n ** 18n,
      treasuryBalance: 100n * 10n ** 18n,
    });
    expect(calls).toHaveLength(4);
    expect(new Set(calls.map((c) => c.block))).toEqual(new Set(['0x2710']));
    expect(calls[3]).toMatchObject({
      to: token,
      data: `0x70a08231${treasury.slice(2).toLowerCase().padStart(64, '0')}`,
    });
  });

  it('reports no treasury balance without a treasury destination', async () => {
    const calls = mockRpc();
    await expect(getBaseMigrationSnapshot('https://rpc', vault, undefined, '0x2105')).resolves.toMatchObject({
      treasuryBalance: 0n,
    });
    expect(calls).toHaveLength(3);
  });

  it('refuses an RPC on another chain', async () => {
    mockRpc('0x1');
    await expect(getBaseMigrationSnapshot('https://rpc', vault, treasury, '0x2105')).rejects.toThrow('expected 0x2105');
  });
});
