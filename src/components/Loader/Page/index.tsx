import logoLoader from '../../../assets/pendulum-icon-loading.svg';

export const defaultPageLoader = (
  <div className="flex items-center justify-center w-full h-full p-8">
    <img src={logoLoader} width="120px" height="120px" alt="Pendulum" />
  </div>
);

export const PageLoader = (props: { className?: string }) => (
  <img
    src={logoLoader}
    width="120px"
    height="120px"
    alt="Pendulum"
    {...props}
  />
);
