import Tag from "../Tag/Tag";

export default function CategoryFilter({categories}: {categories: string[]}) {
    return <div className="flex gap-2 flex-wrap">
        {categories.map((category, index) => (
            <Tag key={index} text={category} selected={true} />
        )) }
    </div>
}