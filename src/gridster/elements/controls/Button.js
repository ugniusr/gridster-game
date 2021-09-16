import React, { useState } from "react";

const BUTTON_FILLS = {
  default: "default",
  hover: "hover",
  down: "down",
};

function Button(props) {
  const [buttonFill, setButtonFill] = useState(BUTTON_FILLS.default);

  const handleMouseOver = () => {
    setButtonFill(BUTTON_FILLS.hover);
  };
  const handleMouseDown = () => {
    setButtonFill(BUTTON_FILLS.down);
  };
  const handleMouseUp = () => {
    setButtonFill(BUTTON_FILLS.hover);
  };
  const handleMouseOut = () => {
    setButtonFill(BUTTON_FILLS.default);
  };

  return (
    <button
      className={`controls-button btn-fill__${buttonFill}`}
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
      {...props}
    >
      Generate
    </button>
  );
}

export default Button;
