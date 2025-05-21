'use client';

import { useState } from 'react';

export default function BookColors() {
  const [color, setColor] = useState<string | null>('Branco');

  const colors = [
    { name: 'Branco', bgClass: 'bg-white' },
    { name: 'Cinza Escuro', bgClass: 'bg-custom-tertiary-gray' },
    { name: 'Cinza Claro', bgClass: 'bg-custom-main-gray' },
    { name: 'Verde', bgClass: 'bg-custom-main-green' },
  ];

  return (
    <div>
      <p>
        <span className="font-bold">Cor: </span>
        {color}
      </p>
      <div className="flex gap-2 mt-2">
        {colors.map((item) => (
          <div
            key={item.name}
            className={`relative cursor-pointer w-[28px] h-[28px] rounded-full flex items-center justify-center
                            ${color === item.name ? 'ring-2 ring-black' : ''}
                        `}
            onClick={() => setColor(item.name)}
          >
            <div
              className={`w-full h-full rounded-full ${item.bgClass} 
                            ${color === item.name ? 'border-2 border-white' : ''}
                        `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
