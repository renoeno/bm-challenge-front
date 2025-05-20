export default function CategoryHero({ category }: { category: string }) {
  return (
    <div className="bg-custom-main-yellow p-14 rounded-[18px]">
      <span className="font-bold text-white text-[46px]">/{category}</span>
    </div>
  );
}
