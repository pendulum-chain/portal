import { EventRecord } from '@polkadot/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import Big from 'big.js';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';

/// This function is used to get the frozen account balance from the account data.
/// Some types define the frozen balance as `frozen` and others as `miscFrozen` and `feeFrozen`.
export function getFrozenAccountBalance(balance: PalletBalancesAccountData) {
  const { miscFrozen, feeFrozen } = balance;
  const frozen = balance.get('frozen');
  if (frozen !== undefined) {
    return new Big(frozen.toString());
  } else {
    // Return the larger value of miscFrozen and feeFrozen. Usually these are the same.
    const miscFrozenBig = new Big(miscFrozen.toString());
    const feeFrozenBig = new Big(feeFrozen.toString());
    return miscFrozenBig.gt(feeFrozenBig) ? miscFrozenBig : feeFrozenBig;
  }
}

export function containsError(events: EventRecord[], api: ApiPromise): boolean {
  const errorEvents = events
    // find/filter for failed events
    .filter(({ event }) => api.events.system.ExtrinsicFailed.is(event));

  return errorEvents.length > 0;
}

// Adapted from https://polkadot.js.org/docs/api/cookbook/tx#how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event
export function getErrors(events: EventRecord[], api: ApiPromise) {
  return (
    events
      // find/filter for failed events
      .filter(({ event }) => api.events.system.ExtrinsicFailed.is(event))
      // we know that data for system.ExtrinsicFailed is
      // (DispatchError, DispatchInfo)
      .map(
        ({
          event: {
            data: [error],
          },
        }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((error as any).isModule) {
            // for module errors, we have the section indexed, lookup
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decoded = api.registry.findMetaError((error as any).asModule);
            const { docs, method, section } = decoded;

            return `${section}.${method}: ${docs.join(' ')}`;
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            return error.toString();
          }
        },
      )
  );
}

export function getEventBySectionAndMethod(events: EventRecord[], section: string, method: string) {
  return events
    .filter(
      ({ event: { method: eventMethod, section: eventSection } }) =>
        eventSection.toLowerCase() === section.toLowerCase() && eventMethod.toLowerCase() === method.toLowerCase(),
    )
    .map((event) => event.event);
}

export function getEventMessages(events: EventRecord[]) {
  return events.map(({ event: { data, method, section } }) => {
    return `${section}.${method}( ${data.toString()} )`;
  });
}
