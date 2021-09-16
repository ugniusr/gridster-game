export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function ifCoordsMatch(rowNumber, colNumber, point) {
  const { row, col } = point;
  return rowNumber === row && colNumber === col;
}

export function ifCoordsInPath(rowNumber, colNumber, path) {
  for (let pathItem = 0; pathItem < path.length; pathItem++) {
    if (colNumber === path[pathItem][0] && rowNumber === path[pathItem][1])
      return true;
  }
  return false;
}

export function generateMatrix(numberOfRows, numberOfCols) {
  return Array(numberOfRows)
    .fill(1)
    .map(() => Array(numberOfCols).fill(1));
}
