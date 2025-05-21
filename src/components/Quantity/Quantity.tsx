import { HStack, IconButton, NumberInput } from "@chakra-ui/react"
import { Minus, Plus } from "feather-icons-react"

export default function Quantity({ stock }: { stock: number }) {
    return <div >
        <p className="font-bold text-[17px]">Quantidade</p>
        <p className="text-[16px] mt-2">⚠️ Para este produto quantidade mínima é:</p>
        <div className="rounded-lg border border-[#45474F] w-fit mt-5">
        <NumberInput.Root defaultValue="1" unstyled spinOnPress={false} max={stock} min={1}>
      <HStack gap="2">
        <NumberInput.DecrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <Minus />
          </IconButton>
        </NumberInput.DecrementTrigger>
        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
        <NumberInput.IncrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <Plus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root></div>
    </div>
}