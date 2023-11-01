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
}: {
  link: string;
  disabled?: boolean;
  button: JSX.Element | null;
  children: JSX.Element | null;
}) => {
  const { pathname } = useLocation();
  const isActive = useMemo(() => {
    const [path] = pathname.split('?');
    const paths = path.split('/').filter(Boolean);
    return paths[1].startsWith(link.replace('/', '')) ? true : false;
  }, [link, pathname]);
  const [isOpen, { toggle }] = useBoolean(isActive);

  return (
    <div className={disabled ? 'disabled' : ''}>
      <button
        type="button"
        className={`nav-item collapse-btn mb-0 ${isActive ? 'active' : ''}`}
        onClick={() => toggle()}
      >
        {button}
      </button>
      <div className={`${isOpen ? '' : 'hidden'}`}>{children}</div>
    </div>
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
  const cls = `nav-item ${props?.className?.()}`;
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
            button={
              <>
                {item.prefix}
                <span>{item.title}</span>
                {item.suffix}
              </>
            }
          >
            <div className="submenu">
              {item.submenu.map((subItem, j) => (
                <NavItem key={`${i}-${j}`} item={subItem} onClick={onClick} />
              ))}
            </div>
          </CollapseMenu>
        ) : (
          <NavItem key={i} item={item} onClick={onClick} />
        );
      })}
    </nav>
  );
});

export default Nav;
