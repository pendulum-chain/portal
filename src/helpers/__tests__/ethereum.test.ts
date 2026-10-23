import { keccakAsHex } from '@polkadot/util-crypto';
import { findReleaseTxHash, isContractCode } from '../ethereum';

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
