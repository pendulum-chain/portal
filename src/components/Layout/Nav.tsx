import { memo, useMemo } from 'preact/compat';
import { NavLink, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../GlobalStateProvider';
import useBoolean from '../../hooks/useBoolean';
import { LinkItem, links } from './links';

const CollapseMenu = ({
  link,
  disabled,
  button,
  children,
  ariaControls,
}: {
  link: string;
  disabled?: boolean;
  button: JSX.Element | null;
  children: JSX.Element | null;
  ariaControls?: string;
}) => {
  const { pathname } = useLocation();
  const isActive = useMemo(() => {
    const [path] = pathname.split('?');
    const paths = path.split('/').filter(Boolean);
    return paths[1].startsWith(link.replace('/', '')) ? true : false;
  }, [link, pathname]);
  const [isOpen, { toggle }] = useBoolean(isActive);

  return (
    <section className={`collapse  ${disabled ? 'disabled' : 'collapse-arrow'} ${isOpen ? 'collapse-open' : ''}`}>
      <button
        type="button"
        className={`nav-item collapse-btn collapse-title ${isActive ? 'active' : ''}`}
        onClick={() => toggle()}
        aria-controls={ariaControls}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {button}
      </button>
      <div className="collapse-content p-0">{children}</div>
    </section>
  );
};

const NavItem = ({ item, onClick }: { item: LinkItem; onClick?: () => void }) => {
  const { link, prefix, suffix, title, props, hidden } = item;
  if (hidden) return null;
  const isExternal = link.startsWith('http');
  const linkUi = (
    <>
      {prefix}
      <span>{title}</span>
      {suffix}
    </>
  );
  const cls = `nav-item ${props?.className?.() || ''}`;
  return isExternal ? (
    <a href={link} {...props} className={cls} onClick={onClick}>
      {linkUi}
    </a>
  ) : (
    <NavLink to={link} {...props} onClick={onClick} className={cls}>
      {linkUi}
    </NavLink>
  );
};

export type NavProps = {
  onClick?: () => void;
};

const Nav = memo(({ onClick }: NavProps) => {
  const state = useGlobalState();

  return (
    <nav>
      {links(state).map((item, i) => {
        if (item.hidden) return;
        return item.submenu ? (
          <CollapseMenu
            key={i}
            link={item.link}
            disabled={item.disabled}
            ariaControls="submenu"
            button={
              <>
                {item.prefix}
                <span>{item.title}</span>
                {item.suffix}
              </>
            }
          >
            <ul className="submenu" id="submenu">
              {item.submenu.map((subItem, j) => (
                <li key={`${i}-${j}`}>
                  <NavItem item={subItem} onClick={onClick} />
                </li>
              ))}
            </ul>
          </CollapseMenu>
        ) : (
          <NavItem key={i} item={item} onClick={onClick} />
        );
      })}
    </nav>
  );
});

export default Nav;
