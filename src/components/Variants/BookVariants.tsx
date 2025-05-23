'use client';

import { Variant } from '@/types/types';
import Button from '../Button/Button';
import { useState } from 'react';

export function BookVariants({
  variants,
  handleSelectVariant,
}: {
  variants: Variant[];
  handleSelectVariant: (variant: Variant) => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants[0],
  );

  const handleChangeVariant = (variant: Variant) => {
    setSelectedVariant(variant);
    handleSelectVariant(variant);
  };

  return (
    <div>
      <div>
        <p className="text-custom-text text-[17px] font-bold">Variação</p>
      </div>
      <div className="mt-2 flex gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            variant={
              selectedVariant?.id === variant.id ? 'primary' : 'secondary'
            }
            size="sm"
            className={`"w-full" ${selectedVariant?.id === variant.id ? 'uppercase' : ''}`}
            onClick={() => handleChangeVariant(variant)}
          >
            {variant.variant}
          </Button>
        ))}
      </div>
    </div>
  );
}
