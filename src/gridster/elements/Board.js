import React, { useEffect, useState } from "react";
import Square from "./board/Square";
import { findPath } from "../libs/pathfinding";
import {
  getRandomInt,
  ifCoordsMatch,
  ifCoordsInPath,
  generateMatrix,
} from "../libs/utils";

function Board({ numberOfRows, numberOfCols }) {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [matrix, setMatrix] = useState([[]]); // tracks the states of a squareArray
  const [squareMatrix, setSquareMatrix] = useState([[]]); // the rendered array of Squares
  const [path, setPath] = useState([]);
  const [renderCount, setRenderCount] = useState(0); // a helper var that tracks the "Generate" button clicks

  const updateMatrix = (rowNumber, colNumber, newState) => {
    // Modify the matrix to match the changes in the grid
    setMatrix((prevMatrix) => {
      let matrixCopy = prevMatrix.map((rowArray) => [...rowArray]);
      matrixCopy[rowNumber][colNumber] = newState;
      return matrixCopy;
    });
  };

  const handleSquareClick = (rowNumber, colNumber, newSquareState) => {
    // when a Square is clicked, the updates are reflected in the matrix
    updateMatrix(rowNumber, colNumber, newSquareState);
  };

  const renderSquare = (
    rowNumber,
    colNumber,
    isStartPoint,
    isEndPoint,
    isPathPoint
  ) => (
    <Square
      key={`${rowNumber}${colNumber}`}
      rowNumber={rowNumber}
      colNumber={colNumber}
      onChange={(rowNumber, colNumber, newSquareState) =>
        handleSquareClick(rowNumber, colNumber, newSquareState)
      }
      isStartPoint={isStartPoint}
      isEndPoint={isEndPoint}
      isPathPoint={isPathPoint}
      renderCount={renderCount}
    />
  );

  const renderSingleRow = (rowNumber, startPoint, endPoint, path) => {
    let squares = [];
    for (let colNumber = 0; colNumber < numberOfCols; colNumber++) {
      let isStartPoint = ifCoordsMatch(rowNumber, colNumber, startPoint);
      let isEndPoint = ifCoordsMatch(rowNumber, colNumber, endPoint);
      let isPathPoint = ifCoordsInPath(rowNumber, colNumber, path);
      squares.push(
        renderSquare(
          rowNumber,
          colNumber,
          isStartPoint,
          isEndPoint,
          isPathPoint
        )
      );
    }
    return squares;
  };

  const renderAllRows = (startPoint, endPoint, path) => {
    let rows = [];
    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
      rows.push(
        <div key={rowNumber} className="board-row">
          {renderSingleRow(rowNumber, startPoint, endPoint, path)}
        </div>
      );
    }
    setSquareMatrix(rows);
  };

  useEffect(() => {
    /**
     * If the PATH or the start- or end-Points change,
     * re-render the Board with new params
     */
    if (!startPoint || !endPoint) return;
    renderAllRows(startPoint, endPoint, path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, startPoint, endPoint]);

  useEffect(() => {
    /**
     * Once the matrix is modified, look for a PATH
     * between the start- and end-Points
     */
    if (!startPoint || !endPoint || !matrix) return;
    setPath(findPath(matrix, startPoint, endPoint));
  }, [matrix, startPoint, endPoint]);

  useEffect(() => {
    /**
     * Update the Matrix, so that the start- and end-Point
     * states are set to "clear" (0)
     */
    if (!startPoint || !endPoint) return;
    updateMatrix(startPoint.row, startPoint.col, 0);
    updateMatrix(endPoint.row, endPoint.col, 0);
  }, [startPoint, endPoint]);

  useEffect(() => {
    /**
     * This is the starting Hook to trigger the initial Board setup (and reset)
     */
    // Generate the board (setMatrix)
    setMatrix(generateMatrix(numberOfRows, numberOfCols));
    // Trigger the re-rendering of the Board
    setRenderCount((renderCount) => renderCount + 1);
    // Choose start and end points
    setStartPoint({
      row: getRandomInt(numberOfRows),
      col: 0, // always the first column
    });
    setEndPoint({
      row: getRandomInt(numberOfRows),
      col: numberOfCols - 1, // always the last column
    });
  }, [numberOfRows, numberOfCols]);

  return (
    <div className="game">
      <div className="game-board">{squareMatrix}</div>
    </div>
  );
}

export default Board;
