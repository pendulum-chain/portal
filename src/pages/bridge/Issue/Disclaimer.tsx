import BellIcon from '../../../assets/bell';

type Props = {
  text: string;
};

export default function Disclaimer({ text }: Props) {
  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-base-300 rounded-lg my-4">
      <div className="collapse-title flex flex-row items-center">
        <BellIcon />
        <span className="ml-2">Disclaimer</span>
      </div>
      <div className="collapse-content">{text}</div>
    </div>
  );
}
