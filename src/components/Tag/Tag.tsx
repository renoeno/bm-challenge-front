export default function Tag({text, selected}: {text: string, selected: boolean}) {
    return <button className={`rounded-full text-[15px] leading-[1] px-3 py-2 ${selected ? "bg-custom-auxiliar-gray text-custom-main-gray" : "bg-custom-main-yellow text-white"}`}>{text}</button>
}