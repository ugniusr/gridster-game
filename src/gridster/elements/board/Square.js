import React, { useEffect, useRef, useState } from "react";

const SQUARE_STATES = {
  filled: 1,
  clear: 0,
};

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
  isStartPoint,
  isEndPoint,
  isPathPoint,
  renderCount,
}) {
  const [squareState, setSquareState] = useState(SQUARE_STATES.filled);
  const [squareFill, setSquareFill] = useState(SQUARE_FILLS.filled);
  const isFirstRender = useRef(true);

  const handleClick = () => {
    setSquareState((prevState) => {
      return isStartPoint || isEndPoint ? prevState : Math.abs(prevState - 1);
    });
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
    setColorAccordingToProps();
  };

  const setColorAccordingToState = () => {
    setSquareFill(
      squareState === SQUARE_STATES.clear
        ? SQUARE_FILLS.clear
        : SQUARE_FILLS.filled
    );
  };

  const setColorAccordingToProps = () => {
    if (isStartPoint) {
      setSquareFill(SQUARE_FILLS.start);
      return;
    }
    if (isEndPoint) {
      setSquareFill(SQUARE_FILLS.end);
      return;
    }
    if (isPathPoint) {
      setSquareFill(SQUARE_FILLS.path);
      return;
    }
    setColorAccordingToState();
  };

  useEffect(() => {
    /**
     * When the square state changes,
     * trigger re-coloring, and the parent onChange function
     */
    // Do not run on Component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // color appropriately
    setColorAccordingToState();
    // pass changes to the parent Component
    onChange(rowNumber, colNumber, squareState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squareState]);

  useEffect(() => {
    /**
     * When isPathPoint prop changes,
     * trigger the re-colouring of the Square
     */
    setColorAccordingToProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPathPoint]);

  useEffect(() => {
    /**
     * When the "Generate" button is clicked,
     * reset the state of the Square
     */
    setSquareState(SQUARE_STATES.filled);
    // fill the square according to it's properties
    setColorAccordingToProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderCount]);

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
