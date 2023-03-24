import { memo, useMemo } from 'preact/compat';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useGlobalState } from '../../GlobalStateProvider';
import { Links, links } from './links';

const Nav = memo(() => {
  const { state } = useGlobalState();
  const { network } = useParams();
  const { pathname } = useLocation();

  const linksArr = useMemo<Links>(() => {
    const [path] = pathname.split('?');
    const key = (network ? path.replace(network, '') : path)
      .split('/')
      .filter(Boolean)[0] as keyof typeof links;
    return links[key] || links.default;
  }, [pathname, network]);

  return (
    <nav>
      {linksArr(state).map(({ link, prefix, suffix, title, props }, i) => {
        const isExternal = link.startsWith('http');
        const linkUi = (
          <>
            {prefix}
            <span>{title}</span>
            {suffix}
          </>
        );
        return isExternal ? (
          <a
            key={i}
            href={link}
            {...props}
            className={props?.className?.() || ''}
          >
            {linkUi}
          </a>
        ) : (
          <NavLink key={i} to={link} {...props}>
            {linkUi}
          </NavLink>
        );
      })}
    </nav>
  );
});

export default Nav;
