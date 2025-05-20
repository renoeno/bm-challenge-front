'use client';

import { Search } from 'feather-icons-react';
import { useState, FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (query.trim() !== '') {
      const params = new URLSearchParams(window.location.search);
      params.set('query', query);
      
      router.push(`${pathname}?${params.toString()}`);
    } 
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === '') {
      const params = new URLSearchParams(window.location.search);
      params.delete('query');
      router.push(`${pathname}?${params.toString()}`);
    }
    setQuery(e.target.value);
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        className="w-full pl-10 h-8 pr-4 border rounded-full border-[#112E38] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Pesquisar e filtrar"
        value={query}
        onChange={handleChangeQuery}
      />
      <div
        className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
      >
        <Search />
      </div>
      <button type="submit" className="hidden">Search</button>
    </form>
  );
}