import React, { useState, useEffect } from "react";
import generatePuzzle from "./helpers/generate-puzzle";
import "./App.css";

function App() {
  const [gameBoard, setGameBoard] = useState(generatePuzzle());
  return (
    <div className="App">
      <div className="container">
        <div className="sud-container">
          <h1>Sudoku</h1>
        </div>
        <div className="top-bar">
        </div>
        <div>
          <div className="game-board">
            <table>
              <tbody>
                {gameBoard.map((row, i) => {
                  const tr = row.map((cell, j) => {
                    const classes = cell.isSelected ? `selected` : "";
                    const cellValue = cell.partOfInitialPuzzle
                      ? cell.solutionValue
                      : cell.userInputValue;
                    return (
                      <td
                        key={`${i}-${j}`}
                        className={classes}
                        onClick={() => makeSeleted(i, j)}
                      >
                        {cell.partOfInitialPuzzle ? (
                          <strong>{cellValue}</strong>
                        ) : (
                          <span>{cellValue}</span>
                        )}
                      </td>
                    );
                  });
                  return <tr key={i}>{tr}</tr>;
                })}
              </tbody>
            </table>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;
