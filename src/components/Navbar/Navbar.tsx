import { Logo } from "../common/Logo";
import { NavItem } from "./NavItem/NavItem";
import { Home } from "feather-icons-react";
import { Bell } from "feather-icons-react";
import { Book } from "feather-icons-react";
import { Settings } from "feather-icons-react";
import { Accordion } from "@chakra-ui/react";
import { CollapsbleNavItem } from "./NavItem/CollapsibleNavItem";

export const Navbar = () => {
  return (
    <nav className="w-[244px] bg-white flex flex-col">
      <div className="p-4 pb-3">
        <Logo />
      </div>
      <hr />
      <NavItem isActive icon={<Home width="16px" />} text="Início" />
      <NavItem isActive icon={<Bell width="16px" />} text="Notificações" />
      <CollapsbleNavItem
        isActive
        icon={<Book width="16px" />}
        text="Todos Livros"
        navChildren={["Livros", "Promoções", "Accessórios", "Canecas"]}
      />
      <NavItem isActive icon={<Settings width="16px" />} text="Configurações" />
    </nav>
  );
};
