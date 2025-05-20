interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick?: (category: string) => void;
}

export const NavItem = ({ icon, text, isActive, onClick }: NavItemProps) => {
  return (
    <div
      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer group hover:bg-custom-hover ${
        isActive ? 'bg-custom-hover' : ''
      }`}
      onClick={() => onClick && onClick(text)}
    >
      <span className="text-[12px]">{icon}</span>
      <span
        className={`text-[14px] font-bold group-hover:text-custom-main-yellow ${
          isActive ? 'text-custom-main-yellow' : ''
        }`}
      >
        {text}
      </span>
    </div>
  );
};
