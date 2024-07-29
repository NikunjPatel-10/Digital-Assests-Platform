import { IMenuItem } from "../models/core.model";



export const HeaderConstant = {
  NavbarBrandName: "Digital Assets Platform",
  HomePageHref: '/',
  ProjectsHref: "/projects"
};
export const MenuItems: IMenuItem[] = [
  {
    name: "Home",
    href: HeaderConstant.HomePageHref
  },
  {
    name: "Projects",
    href: HeaderConstant.ProjectsHref
  },
];