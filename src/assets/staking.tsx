import { h } from "preact";

const StakingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="16"
    viewBox="0 0 20 16"
  >
    <path
      className="turn-me-white"
      id="primary"
      d="M20,19H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H20a1,1,0,0,1,1,1V18A1,1,0,0,1,20,19ZM21,9H3v4H21Z"
      transform="translate(-2 -4)"
      fill="none"
      stroke="#1f1f1f"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default StakingIcon;
