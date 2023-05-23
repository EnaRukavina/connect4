import React from 'react';
import { Images } from '../assets/images';
import Button from '../components/Button';

const MainMenu = () => {
  return (
    <div className='bg-purple-dark h-full w-full flex justify-center items-center '>
      <div className='w-[480px] h-[435px] bg-purple-light rounded-[40px] border-3 border-black shadow-custom flex flex-col items-center '>
        <img src={Images.logo} alt='logo' className='my-[70px]' />
        <div className='w-full px-10 gap-6 flex flex-col'>
          <Button
            label='Play vs player'
            iconName='player-vs-player'
            color='yellow'
          />
          <Button label='Game rules' />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
