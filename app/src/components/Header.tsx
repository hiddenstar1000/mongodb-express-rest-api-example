import React from "react";
import { H1 } from "@leafygreen-ui/typography";
import { MongoDBLogoMark } from "@leafygreen-ui/logo";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
  };

  const logoSize = 48;

  const logoStyle: React.CSSProperties = {
    width: `${logoSize}px`,
    marginRight: `${logoSize / 2}px`,
  };

  return (
    <div style={wrapperStyle}>
      <MongoDBLogoMark style={logoStyle} height={logoSize} />
      <H1>{title}</H1>
    </div>
  );
};

export default Header;

