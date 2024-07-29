import { HeaderConstant } from '../../utility/constants/header.constant';
import { NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <NavbarContent>
      <NavbarBrand>
        <Link to={HeaderConstant.HomePageHref}>
          <span className="font-bold text-inherit uppercase select-none">{HeaderConstant.NavbarBrandName}</span>
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default HeaderLogo;