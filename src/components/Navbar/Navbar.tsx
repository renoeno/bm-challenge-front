import { Logo } from '../common/Logo';
import { NavItem } from './NavItem/NavItem';
import { Home } from 'feather-icons-react';
import { Bell } from 'feather-icons-react';
import { Book } from 'feather-icons-react';
import { Settings } from 'feather-icons-react';
import { CollapsbleNavItem } from './NavItem/CollapsibleNavItem';
import { useEffect, useState } from 'react';
import { bookService } from '@/services/bookService';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Início');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const bookData = await bookService.getBooks();
        const categories = [
          ...new Set(bookData.map((book) => book.category).flat()),
        ];
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);

    const params = new URLSearchParams();
    params.set('category', category);

    router.push(`/?${params.toString()}`);
  };

  const handleRedirect = (path: string) => {
    const params = new URLSearchParams();
    params.set('category', '');
    router.push(path);
  };

  return (
    <nav className="w-[244px] bg-white flex flex-col">
      <div className="p-4 pb-3">
        <Logo />
      </div>
      <hr />
      <NavItem
        isActive={selectedCategory === 'Início'}
        onClick={() => handleRedirect('/')}
        icon={<Home width="16px" />}
        text="Início"
      />
      <NavItem
        isActive={selectedCategory === 'Notificações'}
        onClick={() => handleRedirect('/notifications')}
        icon={<Bell width="16px" />}
        text="Notificações"
      />
      <CollapsbleNavItem
        selectedCategory={selectedCategory}
        icon={<Book width="16px" />}
        text="Todos Livros"
        navChildren={categories}
        disabled={loading}
        onClick={(category) => handleCategoryClick(category)}
      />
      <NavItem
        isActive={selectedCategory === 'Configurações'}
        onClick={() => handleRedirect('/settings')}
        icon={<Settings width="16px" />}
        text="Configurações"
      />
    </nav>
  );
}
