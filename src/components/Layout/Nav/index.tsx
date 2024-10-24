import { memo, useEffect, useMemo, useState } from 'preact/compat';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../../GlobalStateProvider';
import { NavCollapseButtonContent } from '../NavCollapseButtonContent';
import { createLinks, LinkItem } from '../links';
import { NavItem } from './NavItem';
import { NavCollapseMenu } from './NavCollapseMenu';

const getActiveLink = (pathname: string): string | null => {
  const [path] = pathname.split('?');
  const paths = path.split('/').filter(Boolean);
  return paths.length > 1 ? `/${paths[1]}` : null;
};

export type NavProps = {
  onClick?: () => void;
};

const Nav = memo(({ onClick }: NavProps) => {
  const state = useGlobalState();

  const [isPlaying, setIsPlaying] = useState(false);
  const links = createLinks(state.tenantName);

  const { pathname } = useLocation();
  const activeLink = useMemo(() => getActiveLink(pathname), [pathname]);
  const [activeSelection, setActiveSelection] = useState<null | string>(activeLink);

  const handleMouseEnter = () => {
    setIsPlaying(true);
  };

  return (
    <nav>
      {links.map((item, i) => {
        if (item.hidden) return;

        return item.submenu ? (
          <div onMouseEnter={handleMouseEnter} className="my-2.5">
            <NavCollapseMenu
              key={i}
              disabled={item.disabled}
              ariaControls="submenu"
              button={<NavCollapseButtonContent item={item} isPlaying={isPlaying} />}
              activeSelection={activeSelection}
              link={item.link}
              onClick={setActiveSelection}
            >
              <ul className="submenu" id={`submenu-${i}`}>
                {item.submenu.map((subItem, j) => (
                  <li key={`${i}-${j}`} className="ml-[3px]">
                    <NavItem item={subItem} onClick={onClick} isSubNavItem={true} />
                  </li>
                ))}
              </ul>
            </NavCollapseMenu>
          </div>
        ) : (
          <NavItem
            key={i}
            item={item}
            onClick={() => {
              setActiveSelection(item.link);
              onClick && onClick();
            }}
          />
        );
      })}
    </nav>
  );
});

export default Nav;
