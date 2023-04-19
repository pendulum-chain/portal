import { memo } from 'preact/compat';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../GlobalStateProvider';
import useBoolean from '../../hooks/useBoolean';
import { LinkItem, links } from './links';

const CollapseMenu = ({
  link,
  button,
  children,
}: {
  link: string;
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
    <>
      <button
        type="button"
        className={`nav-item collapse-btn mb-0 ${isActive ? 'active' : ''}`}
        onClick={() => toggle()}
      >
        {button}
      </button>
      <div className={`${isOpen ? '' : 'hidden'}`}>{children}</div>
    </>
  );
};

const NavItem = ({ item }: { item: LinkItem }) => {
  const { link, prefix, suffix, title, props } = item;
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
    <a href={link} {...props} className={cls}>
      {linkUi}
    </a>
  ) : (
    <NavLink to={link} {...props} className={cls}>
      {linkUi}
    </NavLink>
  );
};

const Nav = memo(() => {
  const { state } = useGlobalState();

  return (
    <nav>
      {links(state).map((item, i) => {
        return item.submenu ? (
          <CollapseMenu
            key={i}
            link={item.link}
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
                <NavItem key={`${i}-${j}`} item={subItem} />
              ))}
            </div>
          </CollapseMenu>
        ) : (
          <NavItem key={i} item={item} />
        );
      })}
    </nav>
  );
});

export default Nav;
