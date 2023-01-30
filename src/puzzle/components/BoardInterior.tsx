import {forwardRef} from "react";
import styled, {css} from "styled-components";
import Puzzle, {BoardElement, isEmptyBoardElement} from "../puzzle";

interface Props {
    puzzle: Puzzle
    cellSize: number
    showOnly?: BoardElement
    showExcept?: BoardElement
    overlay?: boolean
}

const BoardGrid = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${props => props.puzzle.uh}, ${props => props.cellSize}px);
  grid-template-columns: repeat(${props => props.puzzle.uw}, ${props => props.cellSize}px);

  ${props => props.overlay ? css`
    position: fixed;
    pointer-events: none;
    background: ${process.env.REACT_APP_DEBUG === 'true' ? 'rgba(255, 0, 0, 0.5)' : 'transparent'};
  ` : css`
    background-image: url("/puzzle/huarong/board.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
  `}
`

const BoardGridBrickCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; // crucial for correct mouse events handling
  
  background-color: #bbb;
  font-size: 3rem;
`

const BoardGridEmptyCell = styled.div`
  background: transparent;
  pointer-events: none; // crucial for correct mouse events handling
`

const BoardInterior = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const isEmptyCell = (brick: BoardElement) => isEmptyBoardElement(brick)
        || (!!props.showExcept && props.showExcept === brick)
        || (!!props.showOnly && props.showOnly !== brick)

    return (
        <BoardGrid ref={ref} {...props}>
            {props.puzzle.board.map((brick, index) => isEmptyCell(brick) ?
                <BoardGridEmptyCell key={`cell-${index}`}/> :
                <BoardGridBrickCell key={`cell-${index}`}>
                    {brick}
                </BoardGridBrickCell>
            )}
        </BoardGrid>
    )
});

export default BoardInterior;
