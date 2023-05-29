type GameButtonProps = {
  label: string;
  onClick: () => void;
};
export const GameButton = ({ label, onClick }: GameButtonProps) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='text-white uppercase heading-xs bg-purple-dark hover:bg-pink rounded-full px-5 py-2.5 transition'
    >
      {label}
    </button>
  );
};
