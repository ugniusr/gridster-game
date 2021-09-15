import React from "react";

function ButtonStatic({ type }) {
  return (
    <div className="btn-static">
      <div className="btn-static-title">{type}</div>
      <div className={`btn-static-button btn-${type.toLowerCase()}-color`}>
        Generate
      </div>
    </div>
  );
}

export default ButtonStatic;
