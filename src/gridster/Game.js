import React, { useState } from "react";
import Board from "./elements/Board";
import Controls from "./elements/Controls";
import Logo from "./elements/Logo";

function Game() {
  const defaultRows = 10;
  const defaultColumns = 10;
  const [numberOfRows, setNumberOfRows] = useState(defaultRows);
  const [numberOfColumns, setNumberOfColumns] = useState(defaultColumns);
  const onSettingsChange = (numOfRows, numOfColumns) => {
    setNumberOfRows(Number(numOfRows));
    setNumberOfColumns(Number(numOfColumns));
  };

  return (
    <div className="content-wrapper">
      <Logo />
      <Controls
        defaultRows={defaultRows}
        defaultColumns={defaultColumns}
        handleChange={onSettingsChange}
      />
      <Board numberOfRows={numberOfRows} numberOfCols={numberOfColumns} />
    </div>
  );
}

export default Game;
