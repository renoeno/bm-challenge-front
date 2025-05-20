import Button from '../Button/Button';
import { AlignLeft } from 'feather-icons-react';

export default function Filter() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full flex items-center gap-x-[6px] leading-[1] p-x-[6px]"
    >
      <AlignLeft width="16px" height="16px" /> Filtrar
    </Button>
  );
}
