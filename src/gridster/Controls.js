import React from "react";
import IntegerInput from "./elements/controls/IntegerInput";
import InputSeparator from "./elements/controls/InputSeparator";
import { useForm } from "react-hook-form";

function Controls({ defaultRows, defaultColumns, handleChange }) {
  const { register, handleSubmit } = useForm();
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
        <button className="controls-button" type="submit">
          Generate
        </button>
      </form>
    </div>
  );
}

export default Controls;
