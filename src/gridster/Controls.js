import React, { useState } from "react";
import IntegerInput from "./elements/controls/IntegerInput";
import InputSeparator from "./elements/controls/InputSeparator";
import { useForm } from "react-hook-form";

const BUTTON_FILLS = {
  default: "default",
  hover: "hover",
  down: "down",
};

function Controls({ defaultRows, defaultColumns, handleChange }) {
  const [buttonFill, setButtonFill] = useState(BUTTON_FILLS.default);
  const { register, handleSubmit } = useForm();

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

  const onSubmit = (data, e) => {
    console.log(data, e);
    const { rows, columns } = data;
    handleChange(rows, columns);
  };
  return (
    <div className="game-controls">
      <form className="controls-form" onSubmit={handleSubmit(onSubmit)}>
        <IntegerInput
          name="rows"
          label="Rows"
          defaultVal={defaultRows}
          register={register}
        />
        <InputSeparator />
        <IntegerInput
          name="columns"
          label="Columns"
          defaultVal={defaultColumns}
          register={register}
        />
        <button
          className={`controls-button btn-fill__${buttonFill}`}
          type="submit"
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
          Generate
        </button>
      </form>
    </div>
  );
}

export default Controls;
