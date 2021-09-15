import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    id: undefined,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: 'new',
    mines: 10,
  })
  async function newGame() {
    const gameOptions = { difficulty: 0 }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(gameOptions),
    }

    const response = await fetch(url, fetchOptions)

    console.log(response)

    if (response.ok) {
      const newGameStateJSON = await response.json()

      setGame(newGameStateJSON)
    }
  }
  async function handleCheckOrFlagCell(
    row: number,
    col: number,
    action: 'check' | 'flag'
  ) {
    const checkOptions = {
      id: game.id,
      row,
      col,
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/${action}`
    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/JSON' },
      body: JSON.stringify(checkOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJSON = await response.json()

      setGame(newGameStateJSON)
    }
  }
  return (
    <main>
      <h1>The Mine Sweeper</h1>
      <h2>
        <button onClick={newGame}>New Game</button>
      </h2>
      <h3>There are {game.mines} mines</h3>
      <h3>The Game Number is {game.id}</h3>

      <section className="difficulty-0">
        {game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button
                onClick={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'check')
                }}
                onContextMenu={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'check')
                }}
                key={col}
              >
                {square}
              </button>
            )
          })
        })}
      </section>
      <footer>
        <div className="madeby">Created by Austin Pierce</div>
      </footer>
    </main>
  )
}
