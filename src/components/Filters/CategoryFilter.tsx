'use client'

import { useState } from "react";
import Tag from "../Tag/Tag";
import { useRouter, usePathname } from "next/navigation";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory?: string;
  }

export default function CategoryFilter({categories, selectedCategory}: CategoryFilterProps) {
    const router = useRouter();
  const pathname = usePathname();
  
  const handleCategoryClick = (category: string) => {
    // Create URL params
    const params = new URLSearchParams(window.location.search);
    
    if (category === "Todos") {
      // Remove category filter if "Todos" is selected
      params.delete('category');
    } else {
      // Set the category parameter
      params.set('category', category);
    }
    
    // Navigate to the same page with updated parameters
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category, index) => (
        <Tag 
          key={index} 
          text={category} 
          selected={selectedCategory === category} 
          handleSelectCategory={() => handleCategoryClick(category)} 
        />
      ))}
    </div>
  );
}
