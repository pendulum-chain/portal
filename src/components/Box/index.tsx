import { h } from "preact";
import "./styles.css";

type Props = {
  title?: string;
  subTitle?: string;
  children?: JSX.Element | JSX.Element[];
};

const Box = ({ title, subTitle, children }: Props) => {
  return (
    <div class="box">
      <div class="box-inner">
        {title && <h1>{title}</h1>}
        {subTitle && <h2>{subTitle}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Box;
