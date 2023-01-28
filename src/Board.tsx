import {FC} from "react";
import styled from "styled-components";

import {getBoardDimensions, Puzzle} from "./puzzle";

interface BoardProps {
    fitWidth: number;
    fitHeight: number;
    puzzle: Puzzle
}

const BoardGrid = styled.div<{ uw: number, uh: number, size: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.uh}, ${props => props.size}px);
  grid-template-columns: repeat(${props => props.uw}, ${props => props.size}px);

  grid-gap: 1px;
`;

const BoardCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #eee;
  font-size: 2rem;
`;

const Board: FC<BoardProps> = ({fitWidth, fitHeight, puzzle}) => {
    const [unitsWidth, unitsHeight] = getBoardDimensions(puzzle)
    if (!unitsWidth || !unitsHeight) {
        return (
            <h1 color="red">Invalid board</h1>
        );
    }

    const cellSize = Math.min(Math.ceil(fitWidth / unitsWidth), Math.ceil(fitHeight / unitsHeight))
    return (
        <BoardGrid uh={unitsHeight} uw={unitsWidth} size={cellSize}>
            {puzzle.board.map((value, index) =>
                <BoardCell key={`cell-${index}`}>{value}</BoardCell>
            )}
        </BoardGrid>
    );
};

export default Board;
