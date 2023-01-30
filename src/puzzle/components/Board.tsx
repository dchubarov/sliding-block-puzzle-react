import {FC} from "react";
import Puzzle from "../puzzle";
import BoardInterior from "./BoardInterior";

interface Props {
    puzzle: Puzzle
    fitWidth: number
    fitHeight: number
}

const Board: FC<Props> = ({puzzle, fitWidth, fitHeight}) => {
    const cellSize = Math.min(Math.ceil(fitWidth / puzzle.uw), Math.ceil(fitHeight / puzzle.uh));

    return (
        <BoardInterior
            puzzle={puzzle}
            cellSize={cellSize}
        />
    )
}

export default Board;
