'use client'

import { useState } from "react";

export default function BookColors() {
    const [color, setColor] = useState<string | null>('Cinza');

    return (
        <div>
            <p><span className="font-bold">Cor: </span>{color}</p>
            <div className="flex gap-2">
            <div className="w-[28px] h-[28px] rounded-full bg-custom-secondary-gray" onClick={() => setColor('Cinza')}></div>
            <div className="w-[28px] h-[28px] rounded-full bg-custom-tertiary-gray" onClick={() => setColor('Cinza Escuro')}></div>
            <div className="w-[28px] h-[28px] rounded-full bg-custom-main-gray" onClick={() => setColor('Cinza Claro')}></div>
            <div className="w-[28px] h-[28px] rounded-full bg-custom-main-green" onClick={() => setColor('Verde')}></div>
        </div>
        </div>
    );
}