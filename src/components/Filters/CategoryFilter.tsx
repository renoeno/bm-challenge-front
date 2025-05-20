'use client';

import { useState } from 'react';
import Tag from '../Tag/Tag';
import { useRouter, usePathname } from 'next/navigation';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(window.location.search);

    if (category === 'Todos') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category, index) => (
        <Tag
          key={index}
          text={category}
          selected={selectedCategory === category}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
}
