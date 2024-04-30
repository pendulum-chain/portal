// TODO Torsten

const blurpConfig = {
  read: true,
  write: true,
};

export type BlurpType = keyof typeof blurpConfig;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function blurp(type: BlurpType, ...args: any[]) {
  if (blurpConfig[type]) {
    console.log(type, ...args);
  }
}
