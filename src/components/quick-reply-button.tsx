type QuickReplyButtonProps = {
  index: number;
  question: string;
  disabled: boolean;
  onAsk: (index: number) => void;
};

export const QuickReplyButton = ({ index, question, disabled, onAsk }: QuickReplyButtonProps) => {
  const handleClick = () => onAsk(index);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className="border-line rounded-full border bg-white/5 px-3.5 py-2 text-left text-[13px] text-white/90 transition-colors hover:border-(--accent) disabled:opacity-40"
    >
      {question}
    </button>
  );
};
