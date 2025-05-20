export default function CategoryHero({ category }: { category: string }) {
    return <div className="bg-custom-main-yellow p-14">
        <span className="text-bold text-[46px]">/{category}</span>
    </div>
}