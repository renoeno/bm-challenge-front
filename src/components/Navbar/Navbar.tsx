import { Logo } from "../common/Logo";
import { NavItem } from "./NavItem/NavItem";
import { Home } from "feather-icons-react";
import { Bell } from "feather-icons-react";
import { Book } from "feather-icons-react";
import { Settings } from "feather-icons-react";
import { Accordion } from "@chakra-ui/react";
import { CollapsbleNavItem } from "./NavItem/CollapsibleNavItem";
import { useEffect, useState } from "react";
import { bookService } from "@/services/bookService";

export default function Navbar () {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const bookData = await bookService.getBooks()
        const categories = [...new Set(bookData.map((book) => book.category).flat())];
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
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
        navChildren={categories}
      />
      <NavItem isActive icon={<Settings width="16px" />} text="Configurações" />
    </nav>
  );
};
