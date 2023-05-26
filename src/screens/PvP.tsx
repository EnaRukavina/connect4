import { useState } from 'react';
import { Images } from '../assets/images';

const PvP = () => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0],
    [0, 1, 1, 2, 0, 0, 0],
  ];

  const [hoveredColumn, setHoveredColumn] = useState<number>();
  const [turn, setTurn] = useState<number>(2);

  return (
    <div className='bg-purple-light h-full w-full flex justify-center relative'>
      <div className=''>
        <div className='flex items-center gap-[60px]'>
          <div className='w-[140px] h-[160px] bg-white border-3 border-black shadow-custom text-center rounded-[20px] relative'>
            <img
              src={Images['player-one']}
              alt='player-one-icon'
              className='absolute left-0 right-0 m-auto w-[54px] -top-[27px]'
            />
            <p className='heading-s uppercase mt-[46px]'>player 1</p>
            <p className='heading-l'>12</p>
          </div>
          <div className=''>
            <nav className='my-12 flex justify-between items-center'>
              <button className='text-white uppercase heading-xs bg-purple-dark hover:bg-pink rounded-full px-5 py-2.5 transition'>
                menu
              </button>
              <img src={Images['logo']} alt='logo' />
              <button className='text-white uppercase heading-xs bg-purple-dark hover:bg-pink rounded-full px-5 py-2.5 transition'>
                restart
              </button>
            </nav>
            <main className='relative z-50'>
              <img
                className='z-10'
                src={Images['board-layer-black-large']}
                alt='board-layer-black-large'
              />
              <div
                id='markers'
                className='absolute -top-[36px] grid grid-cols-7 w-full justify-items-center'
              >
                {new Array(7).fill(0).map((_, idx) => {
                  return (
                    <img
                      key={idx}
                      src={Images[turn === 1 ? 'marker-red' : 'marker-yellow']}
                      alt={turn === 1 ? 'marker-red' : 'marker-yellow'}
                      className={hoveredColumn === idx ? '' : 'invisible'}
                    />
                  );
                })}
              </div>
              <div
                id='board'
                className='p-4 pl-0 pb-12 justify-items-end absolute top-0 z-20 grid grid-cols-7 grid-rows-6 w-full h-full'
              >
                {board.flat().map((x, idx) => {
                  return (
                    <div key={idx}>
                      {x ? (
                        <img
                          src={
                            Images[
                              x === 1
                                ? 'counter-red-large'
                                : 'counter-yellow-large'
                            ]
                          }
                          alt='counter-red-large'
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <img
                className='absolute top-0 z-30'
                src={Images['board-layer-white-large']}
                alt='board-layer-white-large'
              />
              <div className='text-center text-white absolute left-0 right-0 m-auto flex w-fit z-50 -bottom-[110px]'>
                <img
                  src={Images['turn-background-red']}
                  alt='turn-background-red'
                />
                <div className='absolute right-0 left-0 m-auto h-fit pt-4 top-0 bottom-0'>
                  <p className='heading-xs uppercase '>player 1's turn</p>
                  <p className='heading-l'>3s</p>
                </div>
              </div>

              {/* overlay columns for hover effect */}
              <div
                id='overlay'
                className='justify-items-end absolute top-0 z-50 grid grid-cols-7  w-full h-full'
              >
                {new Array(7).fill(0).map((_, idx) => {
                  return (
                    <div
                      className='h-full w-full'
                      onMouseOver={() => {
                        setHoveredColumn(idx);
                      }}
                      onMouseOut={() => {
                        setHoveredColumn(undefined);
                      }}
                    />
                  );
                })}
              </div>
              {/*  */}
            </main>
          </div>
          <div className='w-[140px] h-[160px] bg-white border-3 border-black shadow-custom text-center rounded-[20px] relative'>
            <img
              src={Images['player-two']}
              alt='player-two-icon'
              className='absolute left-0 right-0 m-auto w-[54px] -top-[27px]'
            />
            <p className='heading-s uppercase mt-[46px]'>player 2</p>
            <p className='heading-l'>23</p>
          </div>
        </div>
      </div>
      <div className='h-[22%] bg-purple-dark w-full bottom-0 absolute rounded-t-[60px]'></div>
    </div>
  );
};

export default PvP;
