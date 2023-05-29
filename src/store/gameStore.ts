import React, { useEffect } from 'react';
import { persist, devtools } from 'zustand/middleware';
import { create } from 'zustand';

type State = {
  emptyBoard: number[][];
  initialCountdown: number;
  board: number[][];
  hoveredColumn: number | null;
  turn: 1 | 2;
  player1Score: number;
  player2Score: number;
  winner: 0 | 1 | 2;
  round: number;
  countdown: number;
  setBoard: (board: number[][]) => void;
  setHoveredColumn: (hoveredColumn: number | null) => void;
  setTurn: (turn: 1 | 2) => void;
  setPlayer1Score: (player1Score: number) => void;
  setPlayer2Score: (player2Score: number) => void;
  setWinner: (winner: 0 | 1 | 2) => void;
  setRound: (round: number) => void;
  setCountdown: (countdown: number) => void;
  checkWin: () => { winner: 0 | 1 | 2; winningTiles: number[][] };
  isBoardFull: () => boolean;
};

const emptyBoard = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
export const useGameStore = create<State>()(
  devtools(
    persist(
      set => ({
        emptyBoard: emptyBoard,
        initialCountdown: 25,
        board: emptyBoard,
        hoveredColumn: null,
        turn: 1,
        player1Score: 0,
        player2Score: 0,
        winner: 0,
        round: 1,
        countdown: 25,
        setBoard: board => set({ board }),
        setHoveredColumn: hoveredColumn => set({ hoveredColumn }),
        setTurn: turn => set({ turn }),
        setPlayer1Score: player1Score => set({ player1Score }),
        setPlayer2Score: player2Score => set({ player2Score }),
        setWinner: winner => set({ winner }),
        setRound: round => set({ round }),
        setCountdown: countdown => set({ countdown }),
        checkWin: () => {
          const { board } = useGameStore.getState() as State;
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
                return { winner: current as 0 | 1 | 2, winningTiles }; // Return the winner and the winning tiles
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
                return { winner: current as 0 | 1 | 2, winningTiles };
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
                return { winner: current as 0 | 1 | 2, winningTiles };
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
                return { winner: current as 0 | 1 | 2, winningTiles };
              }
            }
          }

          return { winner: 0, winningTiles: [] }; // No winner found
        },
        isBoardFull: () => {
          const { board } = useGameStore.getState() as State; // Use type assertion to State
          return board.every(row => row.every(cell => cell !== 0));
        },
        // ...other actions and selectors...
      }),
      {
        name: 'game-store',
      }
    )
  )
);
