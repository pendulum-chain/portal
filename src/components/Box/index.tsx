import './styles.css';
import { h } from 'preact';

type Props = {
  title?: string;
  subTitle?: string;
  children?: JSX.Element | JSX.Element[];
};

const Box = ({ title, subTitle, children }: Props) => {
  return (
    <div className="box">
      <div className="box-inner">
        {title && <h1>{title}</h1>}
        {subTitle && <h2>{subTitle}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Box;
