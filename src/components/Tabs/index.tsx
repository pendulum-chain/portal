import * as React from "preact";
import { h } from "preact";

import "./styles.css";

const Tabs = () => {
  return (
    <div className="date-tabs">
      <ul>
        <li className="active">1D</li>
        <li>1W</li>
        <li>1Y</li>
        <li>All</li>
      </ul>
    </div>
  );
};

export default Tabs;
