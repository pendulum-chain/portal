import BellIcon from '../../../assets/bell';

type Props = {
  text: string;
};

export default function Disclaimer({ text }: Props) {
  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-base-300 rounded-lg my-4">
      <div className="collapse-title flex flex-row items-center">
        <BellIcon />
        <strong className="ml-2">Disclaimer</strong>
      </div>
      <p className="text-sm collapse-content whitespace-pre-line">{text}</p>
    </div>
  );
}
