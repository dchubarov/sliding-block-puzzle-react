import {FC, useState} from "react";
import styled from "styled-components";

import {canMoveBlock, getBoardDimensions, moveBlock, MoveDirection, Puzzle} from "./puzzle";

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
  font-size: 3rem;
`;

const Board: FC<BoardProps> = ({fitWidth, fitHeight, puzzle}) => {
    const [board, setBoard] = useState(puzzle.board)
    const [unitsWidth, unitsHeight] = getBoardDimensions(puzzle)
    if (!unitsWidth || !unitsHeight) {
        return (
            <h1 color="red">Invalid board</h1>
        );
    }

    const cellSize = Math.min(Math.ceil(fitWidth / unitsWidth), Math.ceil(fitHeight / unitsHeight))

    const handleCellClick = (x: number, y: number, cellIndex: number) => {
        let direction: MoveDirection | undefined = undefined

        const a = 20
        if (x >= a && x <= cellSize - a && y >= 0 && y <= a)
            direction = "N"
        else if (x >= 0 && x <= a && y >= a && y <= cellSize - a)
            direction = "W"
        else if (x >= a && x <= cellSize - a && y >= cellSize - a)
            direction = "S"
        else if (x >= cellSize - a && y >= a && y <= cellSize - a)
            direction = "E"

        if (direction) {
            const movable = canMoveBlock({...puzzle, board}, direction, cellIndex);
            console.log(
                board[cellIndex],
                cellIndex,
                direction,
                movable
            );

            if (movable) {
                setBoard(moveBlock({...puzzle, board}, direction, cellIndex))
            }
        }
    }

    return (
        <BoardGrid uh={unitsHeight} uw={unitsWidth} size={cellSize}>
            {board.map((value, index) =>
                <BoardCell key={`cell-${index}`}
                           onClick={e => {e.preventDefault(); handleCellClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY, index)}}>{value}</BoardCell>
            )}
        </BoardGrid>
    );
};

export default Board;
