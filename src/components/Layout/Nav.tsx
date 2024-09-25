import { memo, useEffect, useMemo, useState, useRef } from 'preact/compat';
import { NavLink, useLocation } from 'react-router-dom';

import { useGlobalState } from '../../GlobalStateProvider';
import { createLinks, LinkItem } from './links';
import { NavCollapseButtonContent } from './NavCollapseButtonContent';

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
    return paths[1] && paths[1].startsWith(link.replace('/', '')) ? true : false;
  }, [link, pathname]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className={`collapse ${disabled ? 'disabled' : 'collapse-arrow'} `}>
      <input type="checkbox" checked={isActive} ref={inputRef} />
      <button
        type="button"
        className={`nav-item collapse-btn collapse-title ${isActive ? 'active' : ''}`}
        aria-controls={ariaControls}
        aria-disabled={disabled}
        aria-expanded={inputRef.current?.checked}
      >
        {button}
      </button>
      <div className="collapse-content p-0">{children}</div>
    </section>
  );
};

export const NavItem = ({
  item,
  onClick,
  isSubNavItem = false,
}: {
  item: LinkItem;
  onClick?: () => void;
  isSubNavItem?: boolean;
}) => {
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
  const cls = `nav-item font-outfit ${props?.className?.() || ''} ${isSubNavItem ? 'text-sm' : ''}`;
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [links, setLinks] = useState<LinkItem[]>([]);

  const handleMouseEnter = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const [defaultLinks, loadedLinksPromise] = createLinks(state.tenantName);
    setLinks(defaultLinks);

    loadedLinksPromise.then((links) => setLinks(links)).catch((error) => console.error("Couldn't load links", error));
  }, [state.tenantName]);

  return (
    <nav>
      {links.map((item, i) => {
        if (item.hidden) return;
        return item.submenu ? (
          <div onMouseEnter={handleMouseEnter} className="my-2.5">
            <CollapseMenu
              key={i}
              link={item.link}
              disabled={item.disabled}
              ariaControls="submenu"
              button={<NavCollapseButtonContent item={item} isPlaying={isPlaying} />}
            >
              <ul className="submenu" id={`submenu-${i}`}>
                {item.submenu.map((subItem, j) => (
                  <li key={`${i}-${j}`} className="ml-[3px]">
                    <NavItem item={subItem} onClick={onClick} isSubNavItem={true} />
                  </li>
                ))}
              </ul>
            </CollapseMenu>
          </div>
        ) : (
          <NavItem key={i} item={item} onClick={onClick} />
        );
      })}
    </nav>
  );
});

export default Nav;
