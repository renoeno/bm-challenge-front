import { Accordion, Span } from "@chakra-ui/react";

export const CollapsbleNavItem = ({
  icon,
  text,
  isActive,
  navChildren,
}: {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  navChildren: string[];
}) => {
  return (
    <Accordion.Root collapsible defaultValue={["b"]}>
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
              className="flex items-center gap-2 p-2 ml-8 mr-3 rounded-lg cursor-pointer group hover:bg-custom-hover"
            >
              <span className="text-[14px]  group-hover:text-custom-main-yellow">
                {child}
              </span>
            </Accordion.ItemBody>
          ))}
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};
