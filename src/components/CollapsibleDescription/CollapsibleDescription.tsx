'use client'

import { useState, useRef, useEffect } from 'react';

export default function CollapsibleDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [description]);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  if(description.length < 120) {
    return <p className="text-custom-text text-[16px]">{description}</p>;
  } 
  
  return (
    <div className="relative">
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: isExpanded ? `${height}px` : '96px' 
        }}
      >
        <p className="text-custom-text text-[16px]">{description}</p>
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F6F7F9] to-transparent transition-opacity duration-300 ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
      ></div>
      
      <button 
        onClick={toggleExpanded}
        className="text-custom-text font-medium text-sm mt-2 hover:underline focus:outline-none underline relative"
      >
        {isExpanded ? 'Ler menos' : 'Ler mais'}
      </button>
    </div>
  );
}