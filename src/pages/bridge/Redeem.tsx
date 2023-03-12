import { VNode } from 'preact';
import { useState } from 'preact/hooks';
import { Button, Modal } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import { useIssuePallet } from '../../hooks/spacewalk/issue';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';

function Redeem(): VNode | null {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const issueHelpers = useIssuePallet();
  const vaultRegistryHelpers = useVaultRegistryPallet();

  console.log('issue requests', issueHelpers.getIssueRequests());
  console.log('vaults', vaultRegistryHelpers.getVaults());

  const vaults = vaultRegistryHelpers.getVaults();
  vaults.forEach((vault) => {
    console.log('vault', vault);
    console.log('collateral', vault.id.currencies.collateral);
    vaultRegistryHelpers
      .getVaultStellarPublicKey(vault.id.accountId)
      .then((key) => {
        console.log('key', key?.publicKey());
      });
  });

  return (
    <div
      className="flex items-center justify-center h-full space-walk grid place-items-center"
      style={{ minHeight: 600 }}
    >
      <Modal open={visible} style={{ textAlign: 'center' }}>
        <Modal.Header className="font-bold">Deposit</Modal.Header>

        <Modal.Body>
          <p>Active for 24:00:00</p>
          <br />
          <p>Send 10 USDC to this Stellar address</p>
          <br />
          <p>6jes12cy3bkU1EttA7ZqP9CLw2p8miaiJezaNx7Ra7TR6Xem</p>
          <br />
          <p>Receipt address 5Bsdka...3a10b0</p>
        </Modal.Body>

        <Modal.Actions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{
              textTransform: 'uppercase',
              backgroundColor: '#5defa7',
              borderRadius: 50,
              paddingLeft: 30,
              paddingRight: 30,
            }}
            onClick={toggleVisible}
            className="btn-success"
          >
            <span className="text-black">I have made this transfer</span>
          </Button>
        </Modal.Actions>
      </Modal>

      <div style={{ width: 500 }}>
        <div className="box">
          <div className="box-inner">
            <div className="flex justify-between px-10 py-5 mb-5">
              <NavLink className="hover:text-white" to="/amplitude/bridge">
                Swap
              </NavLink>
              <NavLink className="text-white" to="/amplitude/bridge/redeem">
                Redeem
              </NavLink>
              <NavLink
                className="hover:text-white"
                to="/amplitude/bridge/transfer"
              >
                Transfer
              </NavLink>
            </div>
            <span className="ml-5">From Amplitude</span>
            <div className="space-walk-wrapper">
              <span className="ml-5 pt-5 text-gray-300 block h-16">
                To Stellar <em>received amount</em>
              </span>
              <div>
                <input
                  type="text"
                  className="w-5/6 mx-10 p-2 bg-transparent border-2 mb-10 border-accent"
                  placeholder="Enter stellar address"
                  value=""
                />
              </div>
            </div>
            <div className="parity">
              <Button color="success" onClick={toggleVisible}>
                <span className="uppercase">preview swap</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Redeem;
