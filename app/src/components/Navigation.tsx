import React from "react";
import { SideNav, SideNavItem } from "@leafygreen-ui/side-nav";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();

  return (
    <SideNav aria-label="Navigation Bar" className={className}>
      <SideNavItem
        aria-label="Home"
        as={Link}
        active={location.pathname === "/"}
        to="/"
      >
        Home
      </SideNavItem>
      <SideNavItem
        aria-label="Archive"
        as={Link}
        active={location.pathname === "/archive"}
        to="/archive"
      >
        Archive
      </SideNavItem>
      <SideNavItem
        aria-label="New Post"
        as={Link}
        active={location.pathname === "/create"}
        to="/create"
      >
        New Post
      </SideNavItem>
    </SideNav>
  );
};

export default Navigation;

