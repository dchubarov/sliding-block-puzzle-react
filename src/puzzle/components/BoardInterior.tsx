import {FC} from "react";
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

  ${props => props.overlay && css`
    position: relative;
  `}

  grid-gap: 1px;
  background-color: #eee;
`

const BoardGridBrickCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #bbb;
  font-size: 3rem;
`

const BoardGridEmptyCell = styled.div`
  background: transparent;
`

const BoardInterior: FC<Props> = (props) => {
    const isEmptyCell = (brick: BoardElement) => isEmptyBoardElement(brick)
        || (!!props.showExcept && props.showExcept === brick)
        || (!!props.showOnly && props.showOnly !== brick)

    return (
        <BoardGrid {...props}>
            {props.puzzle.board.map((brick, index) => isEmptyCell(brick) ?
                <BoardGridEmptyCell key={`cell-${index}`}/> :
                <BoardGridBrickCell key={`cell-${index}`}>
                    {brick}
                </BoardGridBrickCell>
            )}
        </BoardGrid>
    )
}

export default BoardInterior;
