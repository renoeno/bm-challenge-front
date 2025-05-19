import { Search } from "feather-icons-react";

export default function SearchBar() {
    return <div className="relative">
        <input type="text" className="w-full pl-10 h-8 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Pesquisar e filtrar" />
        <div className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none">
            <Search />
        </div>
    </div>;
}