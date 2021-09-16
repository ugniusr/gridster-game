import * as PF from "pathfinding";

export const findPath = (matrix, startPoint, endPoint) => {
  let grid = new PF.Grid(matrix);
  let finder = new PF.AStarFinder();
  return finder.findPath(
    startPoint.col,
    startPoint.row,
    endPoint.col,
    endPoint.row,
    grid
  );
};
