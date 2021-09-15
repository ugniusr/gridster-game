import React from "react";
import Board from "./Board";
import Controls from "./Controls";
import Logo from "./Logo";

function Game() {
  return (
    <>
      <Logo />
      <Controls />
      <div className="game">
        <Board />
        {/* <Legend /> */}
        {/* <div className="game-info">TEST GAME INFO</div> */}
      </div>
    </>
  );
}

export default Game;
