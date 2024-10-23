import { CheckIcon } from '@heroicons/react/20/solid';
import { matchSorter } from 'match-sorter';
import { ChangeEvent, useMemo, useState } from 'preact/compat';
import { Avatar, AvatarProps, Button, Input } from 'react-daisyui';

import { repeat } from '../../../helpers/general';
import { Skeleton } from '../../Skeleton';
import { NablaInstanceBackstopPool, NablaInstanceSwapPool } from '../../../hooks/nabla/useNablaInstance';
import { getIcon } from '../../../shared/AssetIcons';
import { Dialog } from '../../Dialog';

export type PoolEntry =
  | { type: 'swapPool'; pool: NablaInstanceSwapPool }
  | { type: 'backstopPool'; pool: NablaInstanceBackstopPool };

interface PoolListProps {
  swapPools: NablaInstanceSwapPool[];
  backstopPool?: NablaInstanceBackstopPool;
  onSelect: (pool: PoolEntry) => void;
  selected:
    | { type: 'token'; tokenAddress: string | undefined }
    | { type: 'backstopPool' }
    | { type: 'swapPool'; poolAddress: string };
}

function PoolList({ swapPools, backstopPool, onSelect, selected }: PoolListProps) {
  const [filter, setFilter] = useState<string>();

  const poolList = useMemo(() => {
    const poolList: PoolEntry[] = swapPools.map((pool) => ({ type: 'swapPool', pool }));
    poolList.sort((a, b) => (a.pool.token.symbol < b.pool.token.symbol ? -1 : 1));

    if (backstopPool !== undefined) {
      poolList.unshift({ type: 'backstopPool', pool: backstopPool });
    }

    if (filter) {
      return matchSorter(poolList, filter, {
        keys: ['pool.token.name', 'pool.token.address', 'pool.token.symbol'],
      });
    }

    return poolList;
  }, [swapPools, backstopPool, filter]);

  const showPoolType = backstopPool !== undefined;

  return (
    <div className="relative">
      <Input
        bordered
        className="sticky top-0 z-10 mb-8 w-full"
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setFilter(ev.currentTarget.value)}
        placeholder="Find by name or address"
      />
      <div className="flex flex-col gap-1">
        {poolList?.map((poolEntry) => {
          const { pool, type } = poolEntry;
          let isSelected;
          switch (selected.type) {
            case 'token':
              isSelected = selected.tokenAddress === pool.token.id;
              break;
            case 'backstopPool':
              isSelected = type === 'backstopPool';
              break;
            case 'swapPool':
              isSelected = type === 'swapPool' && selected.poolAddress === pool.id;
              break;
          }

          return (
            <Button
              type="button"
              size="md"
              color="secondary"
              key={pool.id}
              onClick={() => onSelect(poolEntry)}
              className="h-auto w-full items-center justify-start gap-4 border-0 bg-blackAlpha-200 px-3 py-2 text-left hover:opacity-80 dark:bg-whiteAlpha-200"
            >
              <span className="relative">
                <Avatar
                  size={'xs' as AvatarProps['size']}
                  letters={pool.token.symbol}
                  src={getIcon(pool.token.symbol)}
                  shape="circle"
                  className="text-xs"
                />
                {isSelected && (
                  <CheckIcon className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-green-600 p-[3px] text-white" />
                )}
              </span>
              <span className="ml-3 flex flex-col">
                <span className="text-lg leading-5 dark:text-white">
                  <strong>
                    {showPoolType ? (type === 'backstopPool' ? 'Backstop Pool ' : 'Swap Pool ') : ''}
                    {!showPoolType || type === 'swapPool' ? pool.token.symbol : ''}
                  </strong>
                </span>
                <span className="text-sm leading-5 text-neutral-500">{pool.token.name}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

interface PoolSelectorModalProps extends PoolListProps {
  isLoading?: boolean;
  onClose: () => void;
  open: boolean;
}

export const PoolSelectorModal = ({
  swapPools,
  backstopPool,
  selected,
  isLoading,
  onSelect,
  onClose,
  open,
}: PoolSelectorModalProps) => {
  const content = isLoading ? (
    <>{repeat(<Skeleton className="mb-2 h-10 w-full" />)}</>
  ) : (
    <PoolList swapPools={swapPools} backstopPool={backstopPool} onSelect={onSelect} selected={selected} />
  );

  const title = backstopPool !== undefined ? 'Select a pool' : 'Select a token';

  return <Dialog visible={open} onClose={onClose} actions={<></>} content={content} headerText={title} />;
};
