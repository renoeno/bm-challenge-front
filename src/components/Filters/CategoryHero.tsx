export default function CategoryHero({ category }: { category: string }) {
    return <div className="bg-custom-main-yellow p-14 rounded-full">
        <span className="text-bold text-white text-[46px]">/{category}</span>
    </div>
}