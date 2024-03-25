import { Button } from 'react-daisyui';
import { NavLink } from 'react-router-dom';

import ampe from '../../assets/ampe.svg';
import greenArrow from '../../assets/green-arrow.svg';
import greenWarning from '../../assets/green-warning.svg';

const InsufficientFundsTooltip = () => (
  <div className="bg-black rounded-lg h-8 px-3 flex items-center">
    <img src={greenWarning} className="h-4 w-4 mr-2" />
    <p className="text-[9px] text-primary">
      Insufficient funds to <br /> execute transactions
    </p>
  </div>
);

const JumpingArrow = () => (
  <div className="mx-3">
    <img src={greenArrow} className="animate-bounce-x" />
  </div>
);

export const GetToken = () => {
  const link = '/foucoco/gas';

  return (
    <section className="flex items-center">
      <InsufficientFundsTooltip />
      <JumpingArrow />

      <NavLink to={link}>
        <Button size="sm" color="primary" className="text-sm px-2 sm:px-3" type="button">
          <img src={ampe} className="mr-1.5" />
          <p className="text-black">GET AMPE</p>
        </Button>
      </NavLink>
    </section>
  );
};
