/* eslint-disable @typescript-eslint/ban-types */
export const instanceOf =
  <T extends HTMLElement>(type: Function) =>
  (elem: HTMLElement | EventTarget | null): elem is T =>
    elem instanceof type;
export const ofInput = instanceOf<HTMLInputElement>(HTMLInputElement);
export const ofTextArea = instanceOf<HTMLTextAreaElement>(HTMLTextAreaElement);
export const ofSelect = instanceOf<HTMLSelectElement>(HTMLSelectElement);
export const ofAnchor = instanceOf<HTMLAnchorElement>(HTMLAnchorElement);

export const emptyFn = () => null;
export const repeat = <T>(value: T, times = 3): T[] =>
  new Array(times).fill(value);
