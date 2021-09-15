import React from "react";
import IntegerInput from "./elements/IntegerInput";
import InputSeparator from "./elements/InputSeparator";

function Controls() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="game-controls">
      <form className="controls-form" onSubmit={handleSubmit}>
        <IntegerInput name="rows" label="Rows" placeholder={10} />
        <InputSeparator />
        <IntegerInput name="columns" label="Columns" placeholder={10} />
        <button className="controls-button" type="submit">
          Generate
        </button>
      </form>
    </div>
  );
}

export default Controls;
