export type address = {
  address: string;
  trimLength?: number;
};

const AddressFormatter = ({ address, trimLength = 6 }: address): string => {
  const addressLength = address.length;
  return (
    address.slice(0, trimLength) +
    "..." +
    address.slice(addressLength - trimLength, addressLength)
  );
};

export default AddressFormatter;
