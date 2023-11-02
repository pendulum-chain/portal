import { useCallback, useState } from 'preact/compat';
import BellIcon from '../../../assets/bell';

type Props = {
  text: string;
};

export default function Disclaimer({ text }: Props) {
  const [collapseVisibility, setCollapseVisibility] = useState('');

  const toggle = useCallback(() => {
    if (collapseVisibility === '') {
      setCollapseVisibility('collapse-open');
    } else {
      setCollapseVisibility('');
      const elem = document.activeElement;
      if (elem && elem instanceof HTMLElement) {
        elem.blur();
      }
    }
  }, [collapseVisibility, setCollapseVisibility]);

  return (
    <div
      tabIndex={0}
      onClick={toggle}
      className={`disclaimer cursor-pointer collapse collapse-arrow bg-base-300 rounded-lg my-4 ${collapseVisibility}`}
    >
      <div className="collapse-title flex flex-row items-center">
        <BellIcon />
        <strong className="ml-2">Disclaimer</strong>
      </div>
      <p className="text-sm collapse-content whitespace-pre-line">{text}</p>
    </div>
  );
}
