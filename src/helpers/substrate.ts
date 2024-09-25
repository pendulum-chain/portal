import { EventRecord } from '@polkadot/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import Big from 'big.js';

/// This function is used to get the frozen account balance from the account data.
/// There was a breaking change between Polkadot v0.9.42 and v1.1.0 that changed the way the frozen balance is stored.
/// Previously the frozen balance was in the 'frozen' field but now it's available in 'miscFrozen' and 'feeFrozen'.
export function getFrozenAccountBalance(balance: PalletBalancesAccountData) {
  const { miscFrozen, feeFrozen } = balance;
  // The old 'frozen' balance is the maximum of the new 'miscFrozen' and 'feeFrozen' balances
  const frozen = balance.get('frozen');
  if (frozen !== undefined) {
    return new Big(frozen.toString());
  } else {
    // Return the larger value of miscFrozen and feeFrozen
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
