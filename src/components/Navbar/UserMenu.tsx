import { useAuth } from '@/contexts/AuthContext';
import { Menu, Portal } from '@chakra-ui/react';
import { ChevronUp, ChevronDown } from 'feather-icons-react';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { logout, isAdmin } = useAuth();
  const router = useRouter();

  const handleRedirectToBookCreation = () => {
    router.push('/books/create');
  };
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <ChevronUp size={16} />
          <div className="-mt-[8px]">
            <ChevronDown size={16} />
          </div>
        </div>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {isAdmin ? (
              <Menu.Item
                value="insert-book-a"
                onClick={handleRedirectToBookCreation}
              >
                Inserir livro
              </Menu.Item>
            ) : (
              <Menu.Item value="orders-a" className="font-dm-sans">
                Pedidos
              </Menu.Item>
            )}
            <Menu.Item value="account-a">Conta</Menu.Item>
            <Menu.Item value="logout-a" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
