const generatePuzzle = () => {
  const ROW = true,
    COLUMN = false;
  let puzzle = [
    [6, 2, 4, 7, 1, 9, 5, 8, 3],
    [9, 5, 8, 4, 3, 2, 6, 7, 1],
    [3, 1, 7, 8, 6, 5, 2, 9, 4],
    [8, 9, 1, 5, 7, 6, 4, 3, 2],
    [2, 7, 6, 3, 8, 4, 9, 1, 5],
    [4, 3, 5, 9, 2, 1, 7, 6, 8],
    [1, 6, 9, 2, 4, 8, 3, 5, 7],
    [5, 4, 3, 1, 9, 7, 8, 2, 6],
    [7, 8, 2, 6, 5, 3, 1, 4, 9],
  ];

  const swapValues = (indexA, indexB, rowOrColumn) => {
    for (let i = 0; i < 9; i++) {
      if (rowOrColumn === ROW) {
        let temp = puzzle[indexA][i];
        puzzle[indexA][i] = puzzle[indexB][i];
        puzzle[indexB][i] = temp;
      } else if (rowOrColumn === COLUMN) {
        let temp = puzzle[i][indexA];
        puzzle[i][indexA] = puzzle[i][indexB];
        puzzle[i][indexB] = temp;
      }
    }
  };
  const zeroOrOne = () => {
    return Math.floor(Math.random() * 2);
  };
  const possibleSwapIndex = (n) => {
    let remainder = n % 3;
    if (remainder === 0) {
      return [n + 1, n + 2][zeroOrOne()];
    } else if (remainder === 1) {
      return [n - 1, n + 1][zeroOrOne()];
    } else if (remainder === 2) {
      return [n - 2, n - 1][zeroOrOne()];
    }
  };

  const swapBySingleLine = (rowOrColumn) => {
    for (let i = 0; i < 9; i++) {
      swapValues(i, possibleSwapIndex(i), rowOrColumn);
    }
  };

  const swapByBlock = (rowOrColumn) => {
    for (let indexA = 0; indexA < 3; indexA++) {
      let indexB = possibleSwapIndex(indexA);
      for (let i = 0; i < 3; i++) {
        swapValues(indexA * 3 + i, indexB * 3 + i, rowOrColumn);
      }
    }
  };

  swapByBlock(ROW);
  swapByBlock(COLUMN);
  swapBySingleLine(ROW);
  swapBySingleLine(COLUMN);

  return puzzle.map((row) => {
    return row.map((cell) => {
      return {
        solutionValue: cell,
        partOfInitialPuzzle: Math.random() > 0.4, //Current status of the cell, used to colourize the field
        userInputValue: null,
        isSelected: false,
        isMouseOver: false,
      };
    });
  });
};

export default generatePuzzle;
