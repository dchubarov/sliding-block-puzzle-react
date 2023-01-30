import {FC} from "react";
import styled from "styled-components";
import {usePuzzle, BrickMovementDirection} from "./puzzle";

interface BoardProps {
    fitWidth: number;
    fitHeight: number;
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

const BoardV1: FC<BoardProps> = ({fitWidth, fitHeight}) => {
    const puzzle = usePuzzle()

    const handleCellClick = (x: number, y: number, cellIndex: number) => {
        let direction: BrickMovementDirection | undefined = undefined

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
            puzzle.move(cellIndex, direction, 1)
        }
    }

    const cellSize = Math.min(Math.ceil(fitWidth / puzzle.uw), Math.ceil(fitHeight / puzzle.uh))

    return (
        <BoardGrid uh={puzzle.uh} uw={puzzle.uw} size={cellSize}>
            {puzzle.board.map((value, index) =>
                <BoardCell key={`cell-${index}`}
                           onClick={e => {
                               e.preventDefault();
                               handleCellClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY, index)
                           }}>{value}</BoardCell>
            )}
        </BoardGrid>
    );
};

export default BoardV1;
