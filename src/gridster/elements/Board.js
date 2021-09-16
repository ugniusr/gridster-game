import React, { useEffect, useState } from "react";
import Square from "./board/Square";
import { findPath } from "../libs/pathfinding";
import {
  getRandomInt,
  getRandomIntWithExclusion,
  ifCoordsMatch,
  ifCoordsInPath,
  generateMatrix,
} from "../libs/utils";

const SQUARE_STATES = {
  filled: 1,
  clear: 0,
};

function Board({ numberOfRows, numberOfCols }) {
  const [startSquare, setStartSquare] = useState(null);
  const [endSquare, setEndSquare] = useState(null);
  const [squareStateMatrix, setSquareStateMatrix] = useState([[]]); // tracks the states of a squareBoard
  const [squareBoard, setSquareBoard] = useState([[]]); // the rendered array of Squares
  const [path, setPath] = useState([]);

  const oppositeState = (origState) =>
    origState === SQUARE_STATES.filled
      ? SQUARE_STATES.clear
      : SQUARE_STATES.filled;

  const updateSquareStateMatrix = (rowNumber, colNumber, newState) => {
    console.log("Called update squareStateMatrix:");
    console.log("PREV squareStateMatrix: ", squareStateMatrix);
    // Modify the squareStateMatrix to match the changes in the grid
    setSquareStateMatrix((prevSquareStateMatrix) =>
      prevSquareStateMatrix.map((row, rowIndex) =>
        row.map((origState, colIndex) =>
          rowNumber === rowIndex && colNumber === colIndex
            ? newState
            : origState
        )
      )
    );
  };

  const newSquareStateAfterClick = (rowNumber, colNumber) => {
    let origState = squareStateMatrix[rowNumber][colNumber];
    let isStartSquare = ifCoordsMatch(rowNumber, colNumber, startSquare);
    let isEndSquare = ifCoordsMatch(rowNumber, colNumber, endSquare);
    return isStartSquare || isEndSquare
      ? SQUARE_STATES.clear
      : oppositeState(origState);
  };

  const handleSquareClick = (rowNumber, colNumber) => {
    console.log("Clicked a square with params:");
    console.log(rowNumber);
    console.log(colNumber);
    // if newState, then update the squareStateMatrix
    let newState = newSquareStateAfterClick(rowNumber, colNumber);
    if (newState !== squareStateMatrix[rowNumber][colNumber])
      // when a Square is clicked, the updates are reflected in the squareStateMatrix
      updateSquareStateMatrix(rowNumber, colNumber, newState);
  };

  const renderSquare = (
    rowNumber,
    colNumber,
    isStartSquare,
    isEndSquare,
    isPathSquare,
    isFilled
  ) => (
    <Square
      key={`${rowNumber}${colNumber}`}
      rowNumber={rowNumber}
      colNumber={colNumber}
      onChange={handleSquareClick}
      isStartSquare={isStartSquare}
      isEndSquare={isEndSquare}
      isPathSquare={isPathSquare}
      isFilled={isFilled}
    />
  );

  const renderSingleRow = (rowNumber, startSquare, endSquare, path) => {
    let squares = [];
    for (let colNumber = 0; colNumber < numberOfCols; colNumber++) {
      let isStartSquare = ifCoordsMatch(rowNumber, colNumber, startSquare);
      let isEndSquare = ifCoordsMatch(rowNumber, colNumber, endSquare);
      let isPathSquare = ifCoordsInPath(rowNumber, colNumber, path);
      let isFilled = squareStateMatrix[rowNumber][colNumber] === 1;
      squares.push(
        renderSquare(
          rowNumber,
          colNumber,
          isStartSquare,
          isEndSquare,
          isPathSquare,
          isFilled
        )
      );
    }
    return squares;
  };

  const renderAllRows = (startSquare, endSquare, path) => {
    let rows = [];
    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
      rows.push(
        <div key={rowNumber} className="board-row">
          {renderSingleRow(rowNumber, startSquare, endSquare, path)}
        </div>
      );
    }
    setSquareBoard(rows);
  };

  useEffect(() => {
    /**
     * If the PATH or the start- or end-Squares change,
     * re-render the Board with new params
     */
    if (!startSquare || !endSquare) return;
    renderAllRows(startSquare, endSquare, path);
    console.log("PATH:", path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, startSquare, endSquare]);

  useEffect(() => {
    /**
     * Once the squareStateMatrix is modified, look for a PATH
     * between the start- and end-Squares
     */
    if (!startSquare || !endSquare || !squareStateMatrix) return;
    setPath(findPath(squareStateMatrix, startSquare, endSquare));
    console.log("NEW squareStateMatrix:", squareStateMatrix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squareStateMatrix, startSquare, endSquare]);

  useEffect(() => {
    /**
     * Update the squareStateMatrix, so that the start- and end-Square
     * states are set to "clear" (0)
     */
    if (!startSquare || !endSquare) return;
    updateSquareStateMatrix(
      startSquare.row,
      startSquare.col,
      SQUARE_STATES.clear
    );
    updateSquareStateMatrix(endSquare.row, endSquare.col, SQUARE_STATES.clear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSquare, endSquare]);

  useEffect(() => {
    /**
     * This is the starting Hook to trigger the initial Board setup (and reset)
     */
    // Generate the board (setSquareStateMatrix)
    setSquareStateMatrix(generateMatrix(numberOfRows, numberOfCols));
    // Choose start and end squares
    let randomStartSquareRow = getRandomInt(numberOfRows);
    setStartSquare({
      row: randomStartSquareRow,
      col: 0, // always the first column
    });
    // in the edge-case of only 1 column, avoid overlapping Start and End squares
    let randomEndSquareRow =
      numberOfCols === 1 && numberOfRows > 1
        ? getRandomIntWithExclusion(numberOfRows, randomStartSquareRow)
        : getRandomInt(numberOfRows);
    setEndSquare({
      row: randomEndSquareRow,
      col: numberOfCols - 1, // always the last column
    });
  }, [numberOfRows, numberOfCols]);

  return (
    <div className="game">
      <div className="game-board">{squareBoard}</div>
    </div>
  );
}

export default Board;
