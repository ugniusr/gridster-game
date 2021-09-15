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
    console.log("click");
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
    fillPathOrDefault(isPathPoint);
  };
  const handleMouseOut = () => {
    fillPathOrDefault(isPathPoint);
  };

  const setColorAccordingToState = () => {
    setSquareFill(
      squareState === SQUARE_STATES.clear
        ? SQUARE_FILLS.clear
        : SQUARE_FILLS.filled
    );
  };

  const fillPathOrDefault = (isPathPoint) => {
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // default is always "Filled"
    console.log("squareState: ");
    console.log(squareState);
    setColorAccordingToState();
    onChange(rowNumber, colNumber, squareState);
  }, [squareState]);

  useEffect(() => {
    setSquareState(SQUARE_STATES.filled);
    console.log("Re-mounting");
    // fill the square according to it's properties
    fillPathOrDefault(isPathPoint);
  }, [renderCount]);

  useEffect(() => {
    if (isStartPoint || isEndPoint) return;
    fillPathOrDefault(isPathPoint);
  }, [isPathPoint]);

  return (
    <button
      className={`square fill__${squareFill}`}
      onClick={() => {
        handleClick();
      }}
      onMouseDown={() => {
        handleMouseDown();
      }}
      onMouseUp={() => {
        handleMouseUp();
      }}
      onMouseOver={() => {
        handleMouseOver();
      }}
      onMouseOut={() => {
        handleMouseOut();
      }}
    >
      {/* TODO */}
    </button>
  );
}

export default Square;
