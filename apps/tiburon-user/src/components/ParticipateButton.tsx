interface ParticipateButtonProps {
  onClick: () => void;
}

export default function ParticipateButton({ onClick }: ParticipateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-800 transition-colors"
    >
      Participate
    </button>
  );
}
