import React from "react";
import ButtonStates from "./elements/legend/ButtonStates";
import SquareStates from "./elements/legend/SquareStates";

function Legend() {
  return (
    <div className="legend">
      <div className="legend-title">UI States</div>
      <ButtonStates />
      <SquareStates />
    </div>
  );
}

export default Legend;
