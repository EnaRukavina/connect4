import { Images } from '../assets/images';

type PlayerCardProps = {
  player: 1 | 2;
  score: number;
};

export const PlayerCard = ({ player, score }: PlayerCardProps) => {
  return (
    <div className='bottom-[50px] w-[140px] h-[160px] bg-white border-3 border-black shadow-custom text-center rounded-[20px] relative row-span-1 col-span-1 '>
      <img
        src={Images[`player-${player}`]}
        alt={`player-${player}-icon`}
        className='absolute left-0 right-0 m-auto w-[54px] -top-[27px]'
      />
      <p className='heading-s uppercase mt-[46px]'>player {player}</p>
      <p className='heading-l'>{score}</p>
    </div>
  );
};
