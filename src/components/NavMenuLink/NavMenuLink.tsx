import { NavLink, NavLinkProps } from "react-router-dom";

interface Props extends NavLinkProps {}

const NavMenuLink: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const { to, ...others } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${isActive ? "text-blue-600" : ""}`}
      {...others}
    >
      {children}
    </NavLink>
  );
};

export default NavMenuLink;
