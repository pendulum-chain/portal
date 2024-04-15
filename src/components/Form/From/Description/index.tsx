interface FromDescriptionProps {
  customText?: string;
  network?: string;
}

export const FromDescription = ({ customText, network }: FromDescriptionProps) => {
  if (!customText && !network) return <></>;

  return <div className="text-sm mt-px text-secondary-content">{customText || `From ${network}`}</div>;
};
