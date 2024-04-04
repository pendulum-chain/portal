interface FromDescriptionProps {
  customText?: string;
  network?: string;
}

export const FromDescription = ({ customText, network }: FromDescriptionProps) => {
  let text = '';

  if (customText) {
    text = customText;
  } else if (network) {
    text = `From ${network}`;
  }

  return text ? <div className="text-sm mt-px text-secondary-content">{text}</div> : <></>;
};
