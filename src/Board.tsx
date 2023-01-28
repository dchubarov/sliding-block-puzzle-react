import {FC} from "react";
import styled from "styled-components";

interface BoardProps {
    fitWidth: number;
    fitHeight: number;
}

const BoardGrid = styled.div<{ uw: number, uh: number, size: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.uh}, ${props => props.size}px);
  grid-template-columns: repeat(${props => props.uw}, ${props => props.size}px);
`;

const BoardCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Board: FC<BoardProps> = ({fitWidth, fitHeight}) => {
    const unitsWidth = 4, unitsHeight = 5
    const cellSize = Math.min(Math.ceil(fitWidth / unitsWidth), Math.ceil(fitHeight / unitsHeight))

    return (
        <BoardGrid uh={unitsHeight} uw={unitsWidth} size={cellSize}>
            {[...Array(unitsWidth * unitsHeight).keys()].map(index =>
                <BoardCell key={`cell-${index}`}>{index}</BoardCell>
            )}
        </BoardGrid>
    );
};

export default Board;
