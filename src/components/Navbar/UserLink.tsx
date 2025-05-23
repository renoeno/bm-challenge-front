import { Avatar } from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import { useRouter } from 'next/navigation';

export default function UserLink() {
  const { user } = useAuth();
  const router = useRouter();

  const handleRedirectToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="p-4 border-t mt-auto sticky flex items-center justify-between bg-white bottom-0 z-10">
      {user ? (
        <>
          <div className="flex items-center gap-x-3">
            <Avatar.Root size="xs" variant="solid">
              <Avatar.Fallback name={user?.name} />
            </Avatar.Root>
            <span className="font-bold text-[14px]">{user?.name}</span>
          </div>
          <UserMenu />
        </>
      ) : (
        <span
          className="font-bold text-[14px] cursor-pointer"
          onClick={handleRedirectToLogin}
        >
          Entrar
        </span>
      )}
    </div>
  );
}
