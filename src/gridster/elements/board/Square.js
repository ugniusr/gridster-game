import React, { useEffect, useRef, useState } from "react";

const SQUARE_FILLS = {
  filled: "filled",
  clear: "clear",
  hover: "hover",
  down: "down",
  start: "start",
  end: "end",
  path: "path",
};

function Square({
  rowNumber,
  colNumber,
  onChange,
  isStartSquare,
  isEndSquare,
  isPathSquare,
  isFilled,
}) {
  const [squareFill, setSquareFill] = useState(SQUARE_FILLS.filled);
  const isFirstRender = useRef(true);

  const handleClick = () => {
    onChange(rowNumber, colNumber);
  };

  const handleMouseOver = () => {
    setSquareFill(SQUARE_FILLS.hover);
  };
  const handleMouseDown = () => {
    setSquareFill(SQUARE_FILLS.down);
  };
  const handleMouseUp = () => {
    setSquareFill(SQUARE_FILLS.hover);
  };
  const handleMouseOut = () => {
    setFillAccordingToProps();
  };

  const setFillAccordingToProps = () => {
    if (isStartSquare) {
      setSquareFill(SQUARE_FILLS.start);
      return;
    }
    if (isEndSquare) {
      setSquareFill(SQUARE_FILLS.end);
      return;
    }
    if (isPathSquare) {
      setSquareFill(SQUARE_FILLS.path);
      return;
    }
    // default
    setSquareFill(isFilled ? SQUARE_FILLS.filled : SQUARE_FILLS.clear);
  };

  useEffect(() => {
    /**
     * When the square state changes or a sqare is part of the path,
     * trigger re-coloring
     */
    // Do not run on Component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // color appropriately
    setFillAccordingToProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilled, isPathSquare]);

  return (
    <button
      className={`square fill__${squareFill}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    ></button>
  );
}

export default Square;
