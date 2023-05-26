import { useNavigate } from 'react-router-dom';
import { Images } from '../assets/images';

const Rules = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-purple-light h-full w-full flex justify-center items-center'>
      <div className='mx-5 w-[480px] bg-white rounded-[40px] p-8 border-3 border-black shadow-custom flex flex-col relative'>
        <h1 className='text-center heading-l uppercase'>Rules</h1>
        <h2 className='uppercase text-purple-light heading-s my-4'>
          Objective
        </h2>
        <p className='body-text mb-4'>
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
        <h2 className='uppercase text-purple-light heading-s my-4'>
          How to play
        </h2>
        <Bullet number={1} label='Red goes first in the first game.' />
        <Bullet
          number={2}
          label='Players must alternate turns, and only one disc can be dropped in each turn. '
        />
        <Bullet
          number={3}
          label='The game ends when there is a 4-in-a-row or a stalemate.'
        />
        <Bullet
          number={4}
          label='The starter of the previous game goes second on the next game.'
        />
        <button
          type='button'
          onClick={() => {
            navigate('/');
          }}
          className={`absolute -bottom-8 right-0 left-0 m-auto bg-pink flex justify-center items-center shadow-custom-thinner border-3 hover:border-purple-dark hover:shadow-purple-dark border-black rounded-full h-16 w-16 transition-colors active:translate-y-0.5 active:shadow-[0_3px_0] active:shadow-purple-dark`}
        >
          <img
            src={Images['check-icon']}
            alt='confirm button'
            className='h-5'
          />
        </button>
      </div>
    </div>
  );
};

export default Rules;

type BulletProps = {
  number: number;
  label: string;
};
const Bullet = ({ number, label }: BulletProps) => {
  return (
    <div className='flex mb-2.5'>
      <span className='text-black mr-5 heading-xs'>{number}</span>
      <p className='body-text'>{label}</p>
    </div>
  );
};
