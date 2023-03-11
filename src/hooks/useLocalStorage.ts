import { useCallback, useMemo, useState } from 'react';
import { debounce } from '../helpers/function';
import { storageService } from '../services/storage/local';
import { Storage } from '../services/storage/types';

export interface UseLocalStorageProps<T> {
  /** Storage key */
  key: string;
  /** Default/fallback value */
  defaultValue?: T;
  /** Should the value be parsed (eg.: in case of objects) */
  parse?: boolean;
  /** Should the value updating be debounced (eg.: for quickly changing values) */
  debounce?: number;
}
export interface UseLocalStorageResponse<T> {
  /** Storage state/value */
  state: T | undefined;
  /** Set storage value */
  set: (data: T | undefined) => void;
  /** Merge storage value with existing (eg.: updating part of an object) */
  merge: (data: Partial<T> | ((data?: T) => T) | undefined) => void;
  /** Clear storage value */
  clear: () => void;
}

export const useLocalStorage = <T>({
  key,
  defaultValue,
  parse = false,
  debounce: debounceTime,
}: UseLocalStorageProps<T>): UseLocalStorageResponse<T> => {
  type Def = UseLocalStorageResponse<T>;
  const storageSet = useMemo<Storage['set']>(
    () =>
      debounceTime
        ? debounce(storageService.set, debounceTime)
        : storageService.set,
    [debounceTime],
  );

  const [state, setState] = useState<T | undefined>(() =>
    parse
      ? ({
          ...defaultValue,
          ...storageService.getParsed<T>(key, defaultValue as T),
        } as T)
      : (storageService.get(key) as T | undefined) ?? (defaultValue as T),
  );
  const set = useCallback<Def['set']>(
    (value) => {
      storageSet(key, value);
      setState(value);
    },
    [key, storageSet],
  );
  const clear = useCallback<Def['clear']>(() => {
    storageService.remove(key);
    setState(undefined);
  }, [key]);
  const merge = useCallback<Def['merge']>(
    (value) => {
      setState((prev) => {
        const newVal =
          typeof value === 'function'
            ? value(prev)
            : ({ ...prev, ...value } as T);
        storageSet(key, newVal);
        return newVal;
      });
    },
    [key, storageSet],
  );
  return { state, set, merge, clear };
};
