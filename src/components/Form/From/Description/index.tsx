interface FromDescriptionProps {
  customText?: string;
  network?: string;
}

export const FromDescription = ({ customText, network }: FromDescriptionProps) => {
  if (!customText && !network) return <></>;

  return <div className="mt-px text-sm text-secondary-content">{customText || `From ${network}`}</div>;
};
