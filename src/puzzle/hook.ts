import {useState} from "react";
import Puzzle, {BoardElements, BrickMovementDirection, moveBrick} from "./puzzle";

function usePuzzle(): Puzzle {
    const [board, setBoard] = useState<BoardElements>([
        "A", "B", "B", "C",
        "A", "B", "B", "C",
        "D", "E", "E", "F",
        "D", "G", "H", "F",
        "I", " ", " ", "J",
    ]);

    return {
        board: board,
        uw: 4,
        uh: 5,

        move(index: number, direction: BrickMovementDirection, amount: number) {
            setBoard(prev => {
                const p: Puzzle = {...this, board: [...prev]}
                return moveBrick(p, index, direction, amount) ? p.board : prev;
            });
        }
    }
}

export default usePuzzle;
