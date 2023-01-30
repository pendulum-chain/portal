import { h } from "preact";
import { Button, Dropdown, Modal } from "react-daisyui";
import { NavLink } from "react-router-dom";
import { useState } from "preact/hooks";
import USDC from "../../assets/usdc.png";
import "./styles.css";

export const Dummy = ({ sufix }: { sufix: string }) => (
  <>
    <div className="row-pick-coin">
      <Dropdown>
        <Dropdown.Toggle>
          <Button
            animation={false}
            startIcon={
              <img src={USDC} alt="USDC" style={{ width: 20, height: 20 }} />
            }
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 20, height: 20, marginLeft: 10, maxWidth: 15 }}
                viewBox="0 0 448 512"
              >
                <path
                  className="fill-gray-400"
                  d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
                />
              </svg>
            }
          >
            <span className="normal-case">{`${sufix}USDC`}</span>
          </Button>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-52">
          <Dropdown.Item>{`${sufix}TZS`}</Dropdown.Item>
          <Dropdown.Item>{`${sufix}BRL`}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <input
        type="number"
        className="text-4xl font-bold text-right w-1/2 bg-transparent"
        value={300}
      />
    </div>
    <div className="h-10" />
  </>
);

export function Bridge(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div
      className="flex items-center justify-center h-full space-walk grid place-items-center"
      style={{ minHeight: 600 }}
    >
      <Modal open={visible} style={{ textAlign: "center" }}>
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

        <Modal.Actions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              textTransform: "uppercase",
              backgroundColor: "#5defa7",
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
              <NavLink to="/amplitude/bridge">
                Swap
              </NavLink>
              <NavLink to="/amplitude/bridge/redeem">
                Redeem
              </NavLink>
              <NavLink to="/amplitude/bridge/transfer">
                Transfer
              </NavLink>
            </div>
            <span className="ml-5">From Stellar</span>
            <div className="space-walk-wrapper">
              <Dummy sufix="" />
              <span className="ml-5 pt-5 text-gray-300 block h-16">
                To Amplitude <em>received amount</em>
              </span>
              <Dummy sufix="s" />
            </div>
            <div className="parity">
              <Button color="success mt-5" onClick={toggleVisible}>
                <span className="uppercase">preview swap</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
