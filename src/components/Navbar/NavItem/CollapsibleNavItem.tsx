import { Accordion } from '@chakra-ui/react';
import Link from 'next/link';

interface CollapsableNavItemProps {
  icon: React.ReactNode;
  text: string;
  selectedCategory: string;
  disabled: boolean;
  navChildren: string[];
  onClick?: (category: string) => void;
}

export const CollapsbleNavItem = ({
  icon,
  text,
  selectedCategory,
  disabled,
  navChildren,
  onClick,
}: CollapsableNavItemProps) => {
  return (
    <Accordion.Root collapsible defaultValue={['b']}>
      <Accordion.Item value={text}>
        <Accordion.ItemTrigger className="flex items-center gap-2 p-4 rounded-lg cursor-pointer group hover:bg-custom-hover">
          <span className="text-[12px]">{icon}</span>
          <span className="text-[14px] font-bold group-hover:text-custom-main-yellow">
            {text}
          </span>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          {navChildren.map((child, index) => (
            <Accordion.ItemBody
              key={index}
              className={`flex items-center gap-2 p-2 ml-8 mr-3 rounded-lg  group  ${disabled ? 'pointer-events-none' : 'cursor-pointer hover:bg-custom-hover'} ${selectedCategory === child ? 'bg-custom-hover' : ''}`}
              onClick={() => onClick && onClick(child)}
            >
              <Link href={`/?category=${child}`}>
                <span className="text-[14px] font-bold group-hover:text-custom-main-yellow">
                  {child}
                </span>
                </Link>
            </Accordion.ItemBody>
          ))}
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};
