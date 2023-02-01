import {forwardRef} from "react";
import styled, {css} from "styled-components";
import Puzzle, {BoardElement, brickIndexToInnerCoordinates, isEmptyBoardElement} from "../puzzle";

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
    background-color: ${props.puzzle.boardStyle?.backgroundColor ?? "#ddd"};
    background-image: ${props.puzzle.boardStyle?.backgroundImage ? `url("${process.env.PUBLIC_URL}/puzzle/${props.puzzle.name}/${props.puzzle.boardStyle.backgroundImage}")` : "none"};
    background-repeat: no-repeat;
    background-size: cover;
  `}
`

interface BoardGridBrickProps {
    puzzle: Puzzle
    brick: BoardElement
    index: number
    cellSize: number
}

function brickShowContent(props: BoardGridBrickProps) {
    const s = (typeof props.puzzle.brickStyle === "function") ?
        props.puzzle.brickStyle(props.brick) :
        props.puzzle.brickStyle;

    return s?.showContents || false;
}

function brickCellStyle(props: BoardGridBrickProps) {
    const s = (typeof props.puzzle.brickStyle === "function") ?
        props.puzzle.brickStyle(props.brick) :
        props.puzzle.brickStyle;

    const [bx, by, bw, bh] = brickIndexToInnerCoordinates(props.puzzle, props.brick, props.index);

    return css`
      color: ${s?.foregroundColor ?? "#000"};
      background-color: ${s?.backgroundColor ?? "#bbb"};
      background-image: ${s?.backgroundImage ? `url("${process.env.PUBLIC_URL}/puzzle/${props.puzzle.name}/${s.backgroundImage}")` : "none"};
      background-size: ${props.cellSize * (bw ?? 1)}px ${props.cellSize * (bh ?? 1)}px;
      background-position-x: ${-props.cellSize * (bx ?? 0)}px;
      background-position-y: ${-props.cellSize * (by ?? 0)}px;
      background-repeat: no-repeat;
    `
}

const BoardGridBrickCell = styled.div<BoardGridBrickProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; // crucial for correct mouse events handling in Board
  font-size: 3rem;
  ${props => brickCellStyle(props)}
`

const BoardGridEmptyCell = styled.div`
  background: transparent;
  pointer-events: none; // crucial for correct mouse events handling in Board
`

const BoardInterior = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const isEmptyCell = (brick: BoardElement) => isEmptyBoardElement(brick)
        || (!!props.showExcept && props.showExcept === brick)
        || (!!props.showOnly && props.showOnly !== brick)

    return (
        <BoardGrid ref={ref} {...props}>
            {props.puzzle.board.map((brick, index) => {
                const brickProps = {
                    puzzle: props.puzzle,
                    brick: brick,
                    index: index,
                    cellSize: props.cellSize
                };

                return isEmptyCell(brick) ?
                    <BoardGridEmptyCell key={`cell-${index}`}/> :
                    <BoardGridBrickCell key={`cell-${index}`} {...brickProps}>
                        {brickShowContent(brickProps) && brick}
                    </BoardGridBrickCell>
            })}
        </BoardGrid>
    )
});

export default BoardInterior;
