import { NavLink } from 'react-router-dom';
import { LinkItem } from '../../links';

const isExternalLink = (link: string) => {
  try {
    const parsedUrl = new URL(link);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
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
  const isExternal = isExternalLink(link);

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
