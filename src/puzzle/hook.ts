import {useState} from "react";
import Puzzle, {BoardElements, BrickMovementDirection, moveBrick} from "./puzzle";
import PuzzlePresets, {PuzzlePresetName} from "./presets";

export function usePuzzle(init: Partial<Puzzle> | (() => Partial<Puzzle>)): Puzzle | null {
    const initialPuzzle = (typeof init === "function") ? init() : init;
    const [board, setBoard] = useState<BoardElements>(initialPuzzle.board ?? []);

    if (!initialPuzzle.board || !initialPuzzle.board.length)
        return null;

    return {
        board: board,
        uw: initialPuzzle.uw ?? board.length / initialPuzzle.uh!,
        uh: initialPuzzle.uh ?? board.length / initialPuzzle.uw!,

        move(index: number, direction: BrickMovementDirection, amount: number) {
            setBoard(prev => {
                const p: Puzzle = {...this, board: [...prev]}
                return moveBrick(p, index, direction, amount) ? p.board : prev;
            });
        }
    }
}

export function usePuzzlePreset(preset: PuzzlePresetName): Puzzle | null {
    return usePuzzle(PuzzlePresets[preset]);
}
