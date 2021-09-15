import React from "react";
import SquareStatic from "./SquareStatic";

function SquareStates() {
  return (
    <div>
      <SquareStatic type="default" />
      <SquareStatic type="hover" />
      <SquareStatic type="down" />
      <SquareStatic type="clear" />
      <SquareStatic type="startPoint" />
      <SquareStatic type="endPoint" />
      <SquareStatic type="path" />
    </div>
  );
}

export default SquareStates;
