import React from "react";
import ButtonStatic from "./ButtonStatic";

function ButtonStates() {
  return (
    <div className="button-states">
      <ButtonStatic type="Default" />
      <ButtonStatic type="Hover" />
      <ButtonStatic type="Down" />
    </div>
  );
}

export default ButtonStates;
