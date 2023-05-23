import { Images } from '../assets/images';

type ButtonProps = {
  label: string;
  iconName?: keyof typeof Images;
  color?: 'yellow' | 'pink' | 'white';
};
const Button = ({ label, iconName, color }: ButtonProps) => {
  const colorClasses = {
    yellow: 'bg-yellow',
    pink: 'bg-pink',
    white: 'bg-white',
  };
  const bgColorClass = color ? colorClasses[color] : 'bg-white';

  return (
    <button
      type='button'
      className={`${bgColorClass} flex justify-between items-center font-bold uppercase text-2xl w-full shadow-custom border-3 hover:border-purple-dark hover:shadow-purple-dark border-black rounded-[20px] h-[72px] text-left px-5 transition-colors active:translate-y-1 active:shadow-[0_7px_0]`}
    >
      <label>{label}</label>
      {iconName && <img src={Images[iconName]} />}
    </button>
  );
};

export default Button;
