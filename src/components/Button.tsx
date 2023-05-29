import { Images } from '../assets/images';

type ButtonProps = {
  label: string;
  iconName?: keyof typeof Images;
  color?: 'yellow' | 'pink' | 'white';
  onClick?: any;
  centeredText?: boolean;
};
const Button = ({
  label,
  iconName,
  color,
  onClick,
  centeredText,
}: ButtonProps) => {
  const colorClasses = {
    yellow: 'bg-yellow',
    pink: 'bg-pink text-white',
    white: 'bg-white',
  };
  const bgColorClass = color ? colorClasses[color] : 'bg-white';

  return (
    <button
      type='button'
      onClick={onClick}
      className={`${bgColorClass} ${
        centeredText ? 'justify-center' : 'justify-between '
      } flex items-center font-bold uppercase w-full shadow-custom border-3 hover:border-purple-dark hover:shadow-purple-dark border-black rounded-[20px] h-[72px] text-left px-5 transition-colors active:translate-y-1 active:shadow-[0_7px_0] active:shadow-purple-dark`}
    >
      <label className='cursor-pointer shrink-0 heading-m'>{label}</label>
      {iconName && (
        <img src={Images[iconName]} className='h-10' alt='button-icon' />
      )}
    </button>
  );
};

export default Button;
