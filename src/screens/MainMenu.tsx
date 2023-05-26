import { Images } from '../assets/images';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-purple-light lg:bg-purple-dark h-full w-full flex justify-center items-center '>
      <div className='w-[480px] h-[435px] bg-purple-light rounded-[40px] lg:border-3 border-black lg:shadow-custom flex flex-col items-center '>
        <img src={Images.logo} alt='logo' className='my-[70px]' />
        <div className='w-full px-10 gap-6 flex flex-col'>
          <Button
            label='Play vs player'
            iconName='player-vs-player'
            color='yellow'
            onClick={() => {
              navigate('pvp');
            }}
          />
          <Button
            label='Game rules'
            onClick={() => {
              navigate('rules');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
