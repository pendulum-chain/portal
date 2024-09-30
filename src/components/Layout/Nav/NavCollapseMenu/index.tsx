export const NavCollapseMenu = ({
  link,
  disabled,
  button,
  children,
  ariaControls,
  activeSelection,
  onClick,
}: {
  link: string;
  disabled?: boolean;
  button: JSX.Element | null;
  children: JSX.Element | null;
  ariaControls?: string;
  activeSelection?: string | null;
  onClick: (link: string | null) => void;
}) => {
  const isItemActive = !!activeSelection && activeSelection === link;

  const handleOnClick = () => {
    onClick(isItemActive ? null : link);
  };

  return (
    <section className={`collapse ${disabled ? 'disabled' : 'collapse-arrow'} ${isItemActive ? 'collapse-open' : ''} `}>
      <button
        type="button"
        className={`nav-item collapse-btn collapse-title ${isItemActive ? 'active' : ''}`}
        aria-controls={ariaControls}
        aria-disabled={disabled}
        aria-expanded={isItemActive}
        onClick={handleOnClick}
      >
        {button}
      </button>
      <div className="collapse-content p-0">{children}</div>
    </section>
  );
};
