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
    state: undefined,
    mines: undefined,
  })
  async function newGame () {
    const gameOptions = { difficulty: 0 }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(gameOptions),
    }

    const response = await fetch(url, fetchOptions)

    console.log(response)

    if (response.ok) {
      const newGameStateJSON = await response.json()

      setGame(newGameStateJSON)
    }
  }

  async function handleClickCell(row: number, col: number) {
    const checkOptions = {
      id: game.id, 
      row,
      col,
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`
    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/JSON'},
      body: JSON.stringify(checkOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJSON = await response.json()

      setGame(newGameStateJSON)
    }
  }
  async function handleRightClickCell(row: number, col: number) {
    const checkingOptions = {
      id: game.id,
      row,
      col,
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`
    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(checkingOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJSON = await response.json()

      setGame(newGameStateJSON)
    }
  }
    
}
    

  return (
    <main>
      <h1>The Mine Sweeper</h1>
      <h2>
        <button onClick={newEasyGame}>New GAme</button>
      </h2>
      <h3>There are {game.Mines}</h3>
      <h3>The Game Number is {game.id}</h3>

      <section className="difficulty-0">
        {Game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button 
              onClick={function (event) {
                event.preventDefault()

                handleClickCell(row, col)
              }}
              onContextMenu={function (event) {
                event.preventDefault()


              }}
            )
          })
        })}
      </section>
    </main>
  )
}
