import { useMemo, useState } from 'preact/hooks';
import { Card, Tabs } from 'react-daisyui';
import Issue from './Issue';
import Redeem from './Redeem';

function Bridge(): JSX.Element | null {
  const [tabValue, setTabValue] = useState(0);

  // TODO - get the network from somewhere
  const parachainNetwork = 'Amplitude';

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
    <div className="h-full flex items-center justify-center grid place-items-center mt-4">
      <Card className="bg-base-200 min-h-500 min-w-535 w-fit">
        <div className="flex justify-between px-10 mt-5">
          <Tabs
            className="flex flex-grow"
            boxed
            value={tabValue}
            onChange={setTabValue}
          >
            <Tabs.Tab className="w-2/4 h-fit p-2" value={0}>
              To {parachainNetwork}
            </Tabs.Tab>
            <Tabs.Tab className="w-2/4 h-fit p-2" value={1}>
              To Stellar
            </Tabs.Tab>
          </Tabs>
        </div>
        {Content}
      </Card>
    </div>
  );
}

export default Bridge;
