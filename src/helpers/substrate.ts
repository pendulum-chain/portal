import { EventRecord } from "@polkadot/types/interfaces";
import { ApiPromise } from "@polkadot/api";

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
            data: [error, info],
          },
        }) => {
          if ((error as any).isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError((error as any).asModule);
            const { docs, method, section } = decoded;

            return `${section}.${method}: ${docs.join(" ")}`;
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            return error.toString();
          }
        }
      )
  );
}

export function getEventMessages(events: EventRecord[]) {
  return events.map(({ event: { data, method, section }, phase }) => {
    return `${section}.${method}( ${data.toString()} )`;
  });
}

