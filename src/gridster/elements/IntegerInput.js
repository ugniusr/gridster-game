import React from "react";

function IntegerInput({ name, label, placeholder }) {
  return (
    <div className="input-group">
      <div className="input-label">{label}</div>
      <input
        className="input-integer"
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default IntegerInput;
