export interface Puzzle {
    rowSize: number;
    board: Array<String>
}

export const KlotskiPuzzle = {
    rowSize: 4,
    board: [
        "A", "B", "B", "C",
        "A", "B", "B", "C",
        "D", "E", "E", "F",
        "D", "G", "H", "F",
        "I", "-", "-", "J",
    ]
}

export function getBoardDimensions(puzzle: Puzzle): Array<number | undefined> {
    if (puzzle.rowSize < 1)
        return [];

    const boardSize = puzzle.board.length;
    if (boardSize < 1 || boardSize % puzzle.rowSize !== 0)
        return [];

    return [puzzle.rowSize, boardSize / puzzle.rowSize]
}
