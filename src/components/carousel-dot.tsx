type CarouselDotProps = {
  index: number;
  label: string;
  active: boolean;
  onSelect: (index: number) => void;
};

export const CarouselDot = ({ index, label, active, onSelect }: CarouselDotProps) => {
  const handleClick = () => onSelect(index);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={label}
      onClick={handleClick}
      className={`h-1.5 rounded-full transition-all duration-300 ${
        active ? "w-6 bg-white" : "w-1.5 bg-white/30"
      }`}
    />
  );
};
