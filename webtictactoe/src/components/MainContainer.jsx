import React, { useState } from 'react';

// Theme colors
const COLORS = {
  primary: '#4CAF50',
  secondary: '#FFC107',
  accent: '#2196F3',
  bg: '#fff',
  text: '#222'
};

// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * This is the main container for the WebTicTacToe game.
   * Handles the game state, user interactions, and displays the game UI.
   * Uses a light theme and the specified color palette.
   */

  // Initial empty board
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true); // X always starts

  // PUBLIC_INTERFACE
  function getWinner(squares) {
    /** Returns 'X', 'O', or null depending on the winner state for given board. */
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],      // rows
      [0,3,6], [1,4,7], [2,5,8],      // columns
      [0,4,8], [2,4,6]                // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    // Don't allow click if cell filled, or game over
    if (board[idx] || getWinner(board)) return;

    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function getStatus() {
    // Returns status string: turn, win or draw
    const winner = getWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square)) {
      return "It's a draw!";
    } else {
      return `Next turn: ${xIsNext ? 'X' : 'O'}`;
    }
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(initialBoard);
    setXIsNext(true);
  }

  // Board rendering
  function renderSquare(idx) {
    let value = board[idx];
    let color = value === 'X' ? COLORS.primary : value === 'O' ? COLORS.accent : COLORS.bg;
    let textColor = value ? COLORS.bg : COLORS.text;
    return (
      <button
        key={idx}
        onClick={() => handleClick(idx)}
        aria-label={`cell ${idx+1} ${value ? value : ''}`}
        style={{
          width: 80, height: 80,
          background: value ? color : COLORS.bg,
          color: value ? textColor : COLORS.text,
          fontSize: '2.2rem',
          fontWeight: 'bold',
          border: `2px solid ${COLORS.secondary}`,
          borderRadius: 8,
          cursor: value || getWinner(board) ? 'not-allowed' : 'pointer',
          outline: 'none',
          transition: 'background .18s'
        }}
        disabled={!!value || !!getWinner(board)}
      >
        {value}
      </button>
    );
  }

  // PUBLIC_INTERFACE
  function renderBoard() {
    // 3x3 grid layout
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 80px)',
          gridGap: 10,
          background: COLORS.bg,
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 0 12px #eee'
        }}
      >
        {board.map((_, i) => renderSquare(i))}
      </div>
    );
  }

  // Main container styling
  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: '100vh',
        color: COLORS.text,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1
        style={{
          marginBottom: 8,
          fontWeight: 700,
          fontSize: '2.5rem',
          letterSpacing: '.05em',
          color: COLORS.primary
        }}
      >
        WebTicTacToe
      </h1>
      <div
        style={{
          marginBottom: 18,
          fontSize: '1.35rem',
          fontWeight: 500,
          color: COLORS.secondary
        }}
        data-testid="game-status"
      >
        {getStatus()}
      </div>
      {renderBoard()}
      <button
        style={{
          marginTop: 18,
          padding: '0.6em 1.8em',
          background: COLORS.secondary,
          color: COLORS.text,
          border: 'none',
          borderRadius: 6,
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0001'
        }}
        onClick={restartGame}
      >
        New Game
      </button>
      <div style={{ marginTop: 16, color: '#aaa', fontSize: '.95rem' }}>
        <span style={{ color: COLORS.primary }}>X</span> vs <span style={{ color: COLORS.accent }}>O</span>
      </div>
    </div>
  );
}

export default MainContainer;
