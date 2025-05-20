interface TagProps {
    text: string;
    selected: boolean;
    handleSelectCategory: () => void;
}

export default function Tag({text, selected, handleSelectCategory}: TagProps) {
    return <button className={`rounded-full text-[15px] leading-[1] px-3 py-2 ${selected ?  "bg-custom-main-yellow text-white" : "bg-custom-auxiliar-gray text-custom-main-gray"}`} onClick={handleSelectCategory}>{text}</button>
}