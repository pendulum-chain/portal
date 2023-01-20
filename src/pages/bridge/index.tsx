import { h } from "preact";
import { Tabs } from "react-daisyui";
import "./styles.css";
import { useMemo, useState } from "preact/hooks";
import Redeem from "./Redeem";
import Issue from "./Issue";

function Bridge(): JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  // TODO - get the network from somewhere
  const parachainNetwork = "Amplitude";

  const Content = useMemo(() => {
    switch (tabValue) {
      case 0:
        return <Issue />;
      case 1:
        return <Redeem />;
      default:
        return <Issue />;
    }
  }, [tabValue]);

  return (
    <div
      className="flex items-center justify-center h-full space-walk grid place-items-center"
      style={{ minHeight: 600 }}
    >
      <Tabs value={tabValue} onChange={setTabValue}>
        <Tabs.Tab value={0}>To {parachainNetwork}</Tabs.Tab>
        <Tabs.Tab value={1}>To Stellar</Tabs.Tab>
      </Tabs>
      {Content}
    </div>
  );
}

export default Bridge;
