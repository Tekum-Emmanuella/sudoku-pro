import React, { useState, useEffect } from "react";
import generatePuzzle from "./helpers/generate-puzzle";
import NumberButton from "./NumberButton";
import "./App.css";

function App() {
  const [gameBoard, setGameBoard] = useState(generatePuzzle());
  const [isGameWon, setIsGameWon] = useState(false);
  function findIndexOfSeletedCell() {
    let x, y;
    let isFound = false;
    setGameBoard((prevBoard) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (prevBoard[i][j].isSelected) {
            x = i;
            y = j;
            isFound = true;
          }
        }
      }
      return prevBoard;
    });
    return isFound ? [x, y] : [4, 4];
  }
  const makeSeleted = (i, j) => {
    setGameBoard((prevBoard) => {
      let updatedBoard = prevBoard.map((row, a) =>
        row.map((cell, b) => {
          return { ...cell, isSelected: a === i && b === j ? true : false };
        })
      );
      return updatedBoard;
    });
  };
  const updateSelected = (i, j, value) => {
    setGameBoard((prevBoard) => {
      let updatedBoard = prevBoard.map((row, a) =>
        row.map((cell, b) => {
          if (a === i && b === j) return { ...cell, isSelected: value };
          else return { ...cell };
        })
      );
      return updatedBoard;
    });
  };
  const handleNewGameButton = () => {
    setGameBoard(generatePuzzle());
  };
  function handleNumberButton(n) {
    setGameBoard((prevBoard) => {
      let updatedBoard = prevBoard.map((row, a) =>
        row.map((cell, b) => {
          if (cell.isSelected === true) {
            return { ...cell, userInputValue: n };
          } else {
            return { ...cell };
          }
        })
      );
      return updatedBoard;
    });
  }
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
            <div className="num-board">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <NumberButton
                  key={number}
                  number={number}
                  handleNumberButton={handleNumberButton}
                />
              ))}
            </div>
          </div>
          <br />
          <div className="button-pane">
            <button onClick={handleNewGameButton}>New game</button>
            <div className="control-buttons">
              <button>Hint</button>
              <button>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
