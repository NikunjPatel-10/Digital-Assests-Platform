import { Navbar } from "@nextui-org/react";
import HeaderContent from "./HeaderContent";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  return (
    <div className="overflow-hidden">
      {/* Start : Navbar */}
      <Navbar
        isBordered
        shouldHideOnScroll
        maxWidth="full"
      >
        {/* Start : Brand Logo */}
        <HeaderLogo />
        {/* End : Brand Logo */}
        {/* Start : Header Content */}
        <HeaderContent></HeaderContent>
        {/* End : Header Content */}
      </Navbar>
      {/* End : Navbar */}
    </div>
  );
};

export default Header;