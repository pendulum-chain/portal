import Big from 'big.js';
import { EventRecord } from '@polkadot/types/interfaces';
import { ApiPromise } from '@polkadot/api';
import { nativeToDecimal } from '../shared/parseNumbers/metric';

// Defined [here](https://github.com/pendulum-chain/pendulum/blob/63bd13abbe089308f9702925697dba22d7792eba/runtime/common/src/lib.rs#L55)
const EXISTENTIAL_DEPOSIT = nativeToDecimal(1_000_000_000);

// Calculate the transferable balance. It's calculated as `transferable = free - max(frozen - reserved, ED)`,
// see [here](https://wiki.polkadot.network/docs/learn-guides-accounts#query-account-data-in-polkadot-js).
export function calculateTransferableBalance(free: Big, frozen: Big, reserved: Big) {
  // Check if the free balance is zero to avoid negative results
  if (free.lte(0)) {
    return new Big(0);
  }

  // Emulate Math.max
  const max = frozen.minus(reserved).gt(EXISTENTIAL_DEPOSIT) ? frozen.minus(reserved) : EXISTENTIAL_DEPOSIT;
  return free.minus(max);
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
