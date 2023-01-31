import {useState} from "react";
import Puzzle, {BoardElements, BrickMovementDirection, moveBrick} from "./puzzle";
import PuzzlePresets, {PuzzlePresetName} from "./presets";

export function usePuzzle(init: Partial<Puzzle> | (() => Partial<Puzzle>), name?: string): Puzzle | null {
    const initialPuzzle = (typeof init === "function") ? init() : init;
    const [board, setBoard] = useState<BoardElements>(initialPuzzle.board ?? []);
    const [moveCount, setMoveCount] = useState(0);

    if (!initialPuzzle.board || !initialPuzzle.board.length) {
        console.warn("Board must not be empty");
        return null;
    }

    return {
        ...initialPuzzle,
        name: name ?? "unknown",
        board: board,
        uw: initialPuzzle.uw ?? board.length / initialPuzzle.uh!,
        uh: initialPuzzle.uh ?? board.length / initialPuzzle.uw!,

        moveCount: moveCount,

        move(index: number, direction: BrickMovementDirection, amount: number) {
            setBoard(prev => {
                const p: Puzzle = {...this, board: [...prev]}
                if (moveBrick(p, index, direction, amount)) {
                    setMoveCount(count => count + 1);
                    return p.board;
                }
                return prev;
            });
        },
    }
}

export function usePuzzlePreset(preset: PuzzlePresetName): Puzzle | null {
    return usePuzzle(PuzzlePresets[preset], preset);
}
