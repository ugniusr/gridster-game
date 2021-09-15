import React from "react";

function IntegerInput({ name, label, defaultVal, register }) {
  return (
    <div className="input-group">
      <div className="input-label">{label}</div>
      <input
        className="input-integer"
        type="number"
        min="1"
        max="20"
        name={name}
        defaultValue={defaultVal}
        placeholder={defaultVal}
        {...register(name, {
          min: 1,
          max: 20,
        })}
      />
    </div>
  );
}

export default IntegerInput;
