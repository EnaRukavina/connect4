import { useEffect, useState } from 'react';
import { Images } from '../assets/images';

const PvP = () => {
  const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const initialCountdown = 25;

  const [board, setBoard] = useState<number[][]>(emptyBoard);
  const [hoveredColumn, setHoveredColumn] = useState<number>();
  const [turn, setTurn] = useState<1 | 2>(1);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [winner, setWinner] = useState<0 | 1 | 2>(0);
  const [round, setRound] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(initialCountdown);

  const color =
    winner === 1 ? 'bg-pink' : winner === 2 ? 'bg-yellow' : 'bg-purple-dark';

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const decrementCountdown = () => {
      setCountdown(prevCountdown => prevCountdown - 1);
    };
    const resetCountdown = () => {
      setCountdown(initialCountdown);
    };

    timer = setInterval(decrementCountdown, 1000); // Decrement the countdown every second

    // Clear the timer and change the player's turn when the countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
      setTurn(prevTurn => (prevTurn === 1 ? 2 : 1));
      resetCountdown();
    }

    if (winner !== 0) {
      clearInterval(timer);
    }

    // Clear the timer when the component unmounts
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [countdown, turn]);

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

  useEffect(() => {
    if (isBoardFull() && winner === 0) {
      setRound(prevRound => prevRound + 1); // Increase the round number
    }
  }, [board]);

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

  return (
    <div className='bg-purple-light h-full w-full flex justify-center relative'>
      <div className=''>
        <div className='grid grid-rows-auto grid-cols-[auto_1fr_auto] gap-x-[60px] items-center'>
          <div className='row-span-1 col-span-1'></div>

          <nav className='my-12 row-span-1 col-span-1 flex  items-center h-fit justify-between'>
            <button className='text-white uppercase heading-xs bg-purple-dark hover:bg-pink rounded-full px-5 py-2.5 transition'>
              menu
            </button>
            <img src={Images['logo']} alt='logo' />
            <button
              onClick={handleRestart}
              className='text-white uppercase heading-xs bg-purple-dark hover:bg-pink rounded-full px-5 py-2.5 transition'
            >
              restart
            </button>
          </nav>
          {/* empty div */}
          <div className='row-span-1 col-span-1'></div>
          {/*  */}
          <div className='bottom-[50px] w-[140px] h-[160px] bg-white border-3 border-black shadow-custom text-center rounded-[20px] relative row-span-1 col-span-1 '>
            <img
              src={Images['player-one']}
              alt='player-one-icon'
              className='absolute left-0 right-0 m-auto w-[54px] -top-[27px]'
            />
            <p className='heading-s uppercase mt-[46px]'>player 1</p>
            <p className='heading-l'>{player1Score}</p>
          </div>
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
                <button
                  onClick={handleReset}
                  className='text-white uppercase heading-xs bg-purple-dark hover:bg-pink rounded-full px-5 py-2.5 transition'
                >
                  play again
                </button>
              </div>
            ) : (
              <div className='text-center text-white absolute left-0 right-0 m-auto flex w-fit z-50 -bottom-[110px]'>
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

          <div className='bottom-[50px] w-[140px] h-[160px] bg-white border-3 border-black shadow-custom text-center rounded-[20px] relative row-span-1 col-span-1'>
            <img
              src={Images['player-two']}
              alt='player-two-icon'
              className='absolute left-0 right-0 m-auto w-[54px] -top-[27px]'
            />
            <p className='heading-s uppercase mt-[46px]'>player 2</p>
            <p className='heading-l'>{player2Score}</p>
          </div>
        </div>
      </div>
      <div
        className={`h-[30%] ${color} w-full bottom-0 absolute rounded-t-[60px]`}
      ></div>
    </div>
  );
};

export default PvP;
