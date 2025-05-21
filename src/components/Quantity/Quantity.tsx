import { HStack, IconButton, NumberInput } from '@chakra-ui/react';
import { Minus, Plus } from 'feather-icons-react';

interface QuantityProps {
  stock: number;
  quantity: number;
  handleUpdateQuantity: (quantity: number) => void;
}

export default function Quantity({
  stock,
  quantity,
  handleUpdateQuantity,
}: QuantityProps) {
  const max = stock > 10 ? 10 : stock;
  return (
    <div className="rounded-lg border border-[#45474F] w-fit ">
      <NumberInput.Root
        defaultValue="1"
        value={String(quantity)}
        unstyled
        spinOnPress={false}
        max={max}
        min={1}
        onValueChange={(e) => handleUpdateQuantity(parseInt(e.value))}
      >
        <HStack gap="2">
          <NumberInput.DecrementTrigger asChild>
            <IconButton variant="outline" size="sm" disabled={stock === 0}>
              <Minus />
            </IconButton>
          </NumberInput.DecrementTrigger>
          <NumberInput.ValueText
            textAlign="center"
            minW="3ch"
            className="text-[14px] font-semibold"
          />
          <NumberInput.IncrementTrigger asChild>
            <IconButton variant="outline" size="sm" disabled={stock === 0}>
              <Plus />
            </IconButton>
          </NumberInput.IncrementTrigger>
        </HStack>
      </NumberInput.Root>
    </div>
  );
}
