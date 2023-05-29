import { useEffect, useRef, useState } from 'react';
import { Images } from '../assets/images';
import { GameButton } from '../components/GameButton';
import { PlayerCard } from '../components/PlayerCard';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const PvP = () => {
  const navigate = useNavigate();

  const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const initialCountdown = 30;

  const [board, setBoard] = useState<number[][]>(emptyBoard);
  const [hoveredColumn, setHoveredColumn] = useState<number>();
  const [turn, setTurn] = useState<1 | 2>(1);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [winner, setWinner] = useState<0 | 1 | 2>(0);
  const [round, setRound] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(initialCountdown);
  const [countdownPaused, setCountdownPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const color =
    winner === 1 ? 'bg-pink' : winner === 2 ? 'bg-yellow' : 'bg-purple-dark';

  const changePlayerTurn = () => {
    setTurn(turn === 1 ? 2 : 1);
    setCountdown(initialCountdown);
  };

  const checkWin = () => {
    const winningTiles: number[][] = [];

    // Check rows for a win
    for (let row = 0; row < board.length; row++) {
      // Loop through each row
      for (let col = 0; col <= board[row].length - 4; col++) {
        // Loop through each column
        const current = board[row][col];
        // If the current value is not 0 and the next 3 columns are the same
        if (
          current !== 0 &&
          current === board[row][col + 1] &&
          current === board[row][col + 2] &&
          current === board[row][col + 3]
        ) {
          for (let i = 0; i < 4; i++) {
            winningTiles.push([row, col + i]);
          }
          return { winner: current, winningTiles }; // Return the winner and the winning tiles
        } // Otherwise, keep looking
      }
    }

    // Check columns for a win
    for (let col = 0; col < board[0].length; col++) {
      // Loop through each column
      for (let row = 0; row <= board.length - 4; row++) {
        // Loop through each row
        const current = board[row][col]; // Get the current value
        if (
          // If the current value is not 0 and the next 3 rows are the same
          current !== 0 &&
          current === board[row + 1][col] &&
          current === board[row + 2][col] &&
          current === board[row + 3][col]
        ) {
          for (let i = 0; i < 4; i++) {
            winningTiles.push([row + i, col]);
          }
          return { winner: current, winningTiles };
        }
      }
    }

    // Check diagonals (top-left to bottom-right) for a win
    for (let row = 0; row <= board.length - 4; row++) {
      for (let col = 0; col <= board[row].length - 4; col++) {
        const current = board[row][col];
        if (
          current !== 0 &&
          current === board[row + 1][col + 1] &&
          current === board[row + 2][col + 2] &&
          current === board[row + 3][col + 3]
        ) {
          for (let i = 0; i < 4; i++) {
            winningTiles.push([row + i, col + i]);
          }
          return { winner: current, winningTiles };
        }
      }
    }

    // Check diagonals (top-right to bottom-left) for a win
    for (let row = 0; row <= board.length - 4; row++) {
      for (let col = 3; col < board[row].length; col++) {
        const current = board[row][col];
        if (
          current !== 0 &&
          current === board[row + 1][col - 1] &&
          current === board[row + 2][col - 2] &&
          current === board[row + 3][col - 3]
        ) {
          for (let i = 0; i < 4; i++) {
            winningTiles.push([row + i, col - i]);
          }
          return { winner: current, winningTiles };
        }
      }
    }

    return { winner: 0, winningTiles: [] }; // No winner found
  };

  const isBoardFull = () => {
    return board.every(row => row.every(cell => cell !== 0));
  };

  const handleColumnClick = (columnIdx: any) => {
    if (winner !== 0) {
      return; // Disable clicking on the board if there is a winner
    }

    // Find the lowest row with a value of 0 in the clicked column
    let lowestRow = null; // null means the column is full
    for (let i = board.length - 1; i >= 0; i--) {
      // Start at the bottom of the column
      if (board[i][columnIdx] === 0) {
        // If the value is 0
        lowestRow = i; // Set the lowestRow to the current row
        break; // Break out of the loop
      } // Otherwise, keep looking
    } // If no 0s were found, lowestRow will still be null

    // Update the value in the lowest row of the clicked column
    if (lowestRow !== null) {
      // If the column isn't full
      const updatedBoard = [...board]; // Create a copy of the board array
      updatedBoard[lowestRow][columnIdx] = turn; // Update the value
      setBoard(updatedBoard); // Update the state with the new board
      changePlayerTurn();
    }
  };

  const getWinningTilesIndex = () => {
    if (winner) {
      const res = checkWin().winningTiles.map(x => {
        return x[0] * 7 + x[1];
      });
      return res;
    }
    return;
  };

  useEffect(() => {
    const decrementCountdown = () => {
      setCountdown(prevCountdown => prevCountdown - 1);
    };
    const resetCountdown = () => {
      setCountdown(initialCountdown);
    };

    if (!countdownPaused) {
      timerRef.current = setInterval(decrementCountdown, 1000);
    }

    // Clear the timer and change the player's turn when the countdown reaches 0
    if (countdown === 0) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setTurn(prevTurn => (prevTurn === 1 ? 2 : 1));
      resetCountdown();
    }

    if (winner !== 0) {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }

    // Clear the timer when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current as NodeJS.Timeout);
      }
    };
  }, [countdown, turn, countdownPaused]);

  useEffect(() => {
    const winner = checkWin().winner; // Check if there's a winner
    if (winner !== 0) {
      if (winner === 1) {
        setWinner(1);
        setPlayer1Score(player1Score + 1);
      } else {
        setWinner(2);
        setPlayer2Score(player2Score + 1);
      }
      setRound(prevRound => prevRound + 1); // Increment the round number
    }
  }, [board]);

  useEffect(() => {
    if (isBoardFull() && winner === 0) {
      setRound(prevRound => prevRound + 1); // Increase the round number
    }
  }, [board]);

  const handleReset = () => {
    setBoard(emptyBoard);
    setCountdown(initialCountdown);
    if (round % 2 === 0) {
      setTurn(2);
    } else {
      setTurn(1);
    }
    setWinner(0);
  };

  const handleRestart = () => {
    setBoard(emptyBoard);
    setCountdown(initialCountdown);
    setTurn(1);
    setWinner(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRound(1);
    setMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
    setCountdownPaused(true);
  };

  const handleContinueGame = () => {
    setMenuOpen(false);
    setCountdownPaused(false);
  };

  return (
    <div className='bg-purple-light h-screen w-screen overflow-auto flex justify-center '>
      {menuOpen && (
        <div className='absolute top-0 left-0 flex items-center justify-center bg-black/50 z-[100] h-full w-full'>
          <div className='p-10 gap-6 w-[480px] bg-purple-light rounded-[40px] lg:border-3 border-black lg:shadow-custom flex flex-col items-center '>
            <h1 className='heading-l text-white uppercase my-4'>PAUSE</h1>
            <Button
              label='continue game'
              centeredText
              onClick={handleContinueGame}
            />
            <Button label='restart' centeredText onClick={handleRestart} />
            <Button
              label='quit game'
              color='pink'
              centeredText
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
        </div>
      )}

      <div className=''>
        <div className='grid grid-rows-auto grid-cols-[auto_1fr_auto] gap-x-[60px] items-center'>
          <EmptyDiv />
          <nav className='my-12 row-span-1 col-span-1 flex  items-center h-fit justify-between'>
            <GameButton label='menu' onClick={handleOpenMenu} />
            <img
              src={Images['logo']}
              alt='logo'
              className='relative left-2.5'
            />
            <GameButton label='restart' onClick={handleRestart} />
          </nav>
          <EmptyDiv />
          <PlayerCard player={1} score={player1Score} />
          <main className='flex-grow row-span-1 col-span-1 items-center relative z-50'>
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
                      <div className='relative'>
                        <motion.img
                          animate={{
                            y: [-150, 0, -30, 0, -10, 0], // the y position of the tile at each keyframe (0%, 40%, 60%, 70%, 80%, 100%)
                          }}
                          transition={{
                            duration: 0.6,
                            times: [0, 0.4, 0.6, 0.8, 0.9, 1], // the time at which each keyframe occurs (0%, 40%, 60%, 70%, 80%, 100%)
                          }}
                          src={
                            Images[
                              x === 1
                                ? 'counter-red-large'
                                : 'counter-yellow-large'
                            ]
                          }
                          alt='counter-red-large'
                        />
                        {getWinningTilesIndex()?.map(x => {
                          if (x === idx)
                            return (
                              <div
                                key={x}
                                className='absolute top-[-2px] bottom-0 left-0 right-0 m-auto w-8 h-8 border-[6px] border-white rounded-full bg-transparent'
                              />
                            );
                        })}
                      </div>
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

            {winner || isBoardFull() ? (
              <div className='w-[285px] rounded-[20px]  border-3 border-black shadow-custom items-center py-4 text-center uppercase flex-col absolute left-0 right-0 m-auto flex z-50 -bottom-[110px] bg-white'>
                <p className='heading-xs '>{`${
                  winner ? `player ${winner}` : 'no one'
                } `}</p>
                <p className='heading-l'>wins</p>
                <GameButton label='play again' onClick={handleReset} />
              </div>
            ) : (
              <div
                className={`text-center ${
                  turn === 1 ? 'text-white' : 'text-black'
                } absolute left-0 right-0 m-auto flex w-fit z-50 -bottom-[110px]`}
              >
                <img
                  src={
                    Images[
                      turn === 1
                        ? 'turn-background-red'
                        : 'turn-background-yellow'
                    ]
                  }
                  alt='turn-background-red'
                />

                <div className='absolute right-0 left-0 m-auto h-fit pt-4 top-0 bottom-0'>
                  <p className='heading-xs uppercase '>player {turn}'s turn</p>
                  <p className='heading-l'>{`${countdown}s`}</p>
                </div>
              </div>
            )}

            {/* overlay columns for hover effect */}
            <div
              id='overlay'
              className='justify-items-end absolute top-0 z-50 grid grid-cols-7  w-full h-full'
            >
              {new Array(7).fill(0).map((_, idx) => {
                return (
                  <div
                    key={idx}
                    className='h-full w-full'
                    onClick={() => {
                      handleColumnClick(idx);
                    }}
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
          <PlayerCard player={2} score={player2Score} />
        </div>
      </div>
      <div
        className={`h-[200px] ${color} w-full bottom-0 absolute rounded-t-[60px]`}
      ></div>
    </div>
  );
};

export default PvP;

const EmptyDiv = () => {
  return <div className='row-span-1 col-span-1'></div>;
};
