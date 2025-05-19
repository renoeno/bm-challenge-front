export const NavItem = ({
  icon,
  text,
  isActive,
}: {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 p-4 rounded-lg cursor-pointer group hover:bg-custom-hover">
      <span>{icon}</span>
      <span className="text-[14px] font-bold group-hover:text-custom-main-yellow">
        {text}
      </span>
    </div>
  );
};
