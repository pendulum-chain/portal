import { memo } from 'preact/compat';
import { NavLink } from 'react-router-dom';
import { links } from './links';

const Nav = memo(() => {
  // ? TODO: different links based on path
  return (
    <nav>
      {links.map(({ link, prefix, suffix, title, props }, i) => {
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
            className={String(props.className || '')}
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
