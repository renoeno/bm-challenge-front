interface TagProps {
  text: string;
  selected: boolean;
  onClick?: () => void;
}

export default function Tag({ text, selected, onClick }: TagProps) {
  return (
    <button
      className={`rounded-full text-[15px] leading-[1] px-3 py-2 ${selected ? 'bg-custom-main-yellow text-white' : 'bg-custom-auxiliar-gray text-custom-main-gray'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
