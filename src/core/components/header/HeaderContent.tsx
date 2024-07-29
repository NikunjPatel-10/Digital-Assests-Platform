import { MenuItems } from "../../utility/constants/header.constant";
import {
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import { Suspense } from "react";
import NavbarMenuItems from "./HeaderMenuItems";
import { ThemeSwitcher } from "../../../shared/components/ThemeSwitcher";
import Search from "../../../shared/common-ui/search-input/Search";
import { useLocation } from "react-router-dom";
import { IMenuItem } from "../../utility/models/core.model";

const HeaderContent = () => {
  const location = useLocation();
  const searchPathName = location.pathname === '/search';

  const menuItems = MenuItems;
  return (
    <>
      {/* Start : Navbar Content */}
      <NavbarContent justify="end" className="items-center">
        {/* Start : Global Search bar */}
        {searchPathName && <Suspense>
          <Search />
        </Suspense>
        }
        {/* End : Global Search bar */}
        {/* Start : Navbar Items */}
        <NavbarItem>
          {/* Start : Theme Switcher */}
          <ThemeSwitcher></ThemeSwitcher>
          {/* End : Theme Switcher */}
        </NavbarItem>
        {menuItems.map((item: IMenuItem, index: number) => (
          <NavbarMenuItems
            key={`${item}-${index}`}
            items={item}
          ></NavbarMenuItems>
        ))}
        {/* End : Navbar Items */}
      </NavbarContent>
      {/* End : Navbar Content */}
    </>
  );
};

export default HeaderContent;