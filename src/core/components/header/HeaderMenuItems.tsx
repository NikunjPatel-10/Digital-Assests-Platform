import { NavbarMenuItem } from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';
import { IMenuItem } from '../../utility/models/core.model';

interface NavbarMenuItemsProps {
  items: IMenuItem;
}

const NavbarMenuItems = ({ items }: NavbarMenuItemsProps) => {
  const location = useLocation();
  const path = location.pathname;
  const { href, name } = items;
  return (
    <NavbarMenuItem>
      <Link
        className={
          (path.startsWith(href)
            ? "text-primary-300 font-bold"
            : undefined) + " w-full"
        }
        to={href}
      >
        {name}
      </Link>
    </NavbarMenuItem>
  );
};

export default NavbarMenuItems;
