import Filter from "@/components/Filter/Filter";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen px-8 py-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-custom-dark-gray font-bold text-[28px] leading-[1]">
          Todos Livros
        </h1>
      </div>
      <hr className="bg-custom-tertiary-gray"/>
      <div className="mt-4 flex justify-between items-center ">
        <div className="w-[50%]">
        <SearchBar /></div>
        <Filter />
      </div>
    </div>
  );
}
