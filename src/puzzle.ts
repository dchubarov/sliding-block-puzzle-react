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

export function generateFifteenPuzzle() {
    const numbers = Array(16)
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = `${i + 1}`
    }
    numbers[15] = "-"
    numbers.sort(() => Math.random() - 0.5)
    return {
        rowSize: 4,
        board: numbers,
    }
}

export function getBoardDimensions(puzzle: Puzzle): Array<number | undefined> {
    if (puzzle.rowSize < 1)
        return [];

    const boardSize = puzzle.board.length;
    if (boardSize < 1 || boardSize % puzzle.rowSize !== 0)
        return [];

    return [puzzle.rowSize, boardSize / puzzle.rowSize]
}

export type MoveDirection = "N" | "W" | "S" | "E";

export function canMoveBlock(puzzle: Puzzle, direction: MoveDirection, idx: number) {
    const block = puzzle.board[idx]
    if (!block || block === "-")
        return false;

    const isEmptyOrSelf = (idx: number) => {
        return puzzle.board[idx] === undefined || puzzle.board[idx] === "-"
            || puzzle.board[idx] === "0" || puzzle.board[idx] === block
    }

    for (let i = 0; i < puzzle.board.length; i++) {
        if (puzzle.board[i] !== block) continue;

        const col = i % puzzle.rowSize, row = Math.floor(i / puzzle.rowSize)
        let blocked = false
        switch (direction) {
            case "W":
                blocked = col === 0 || !isEmptyOrSelf(i - 1)
                break
            case "E":
                blocked = col >= puzzle.rowSize - 1 || !isEmptyOrSelf(i + 1)
                break
            case "N":
                blocked = row === 0 || !isEmptyOrSelf((row - 1) * puzzle.rowSize + col)
                break
            case "S":
                blocked = row >= puzzle.board.length / puzzle.rowSize - 1 || !isEmptyOrSelf((row + 1) * puzzle.rowSize + col)
                break
        }

        if (blocked)
            return false
    }

    return true
}

export function moveBlock(puzzle: Puzzle, direction: MoveDirection, idx: number) {
    const newBoard = [...puzzle.board]

    let shift = 0
    switch (direction) {
        case "W":
            shift = -1
            break
        case "E":
            shift = 1
            break
        case "N":
            shift = -puzzle.rowSize
            break
        case "S":
            shift = puzzle.rowSize
            break
    }

    const swap = (i: number) => {
        if (puzzle.board[i] === block) {
            newBoard[i + shift] = block
            newBoard[i] = "-"
        }
    }

    const block = puzzle.board[idx]
    if (shift > 0) {
        for (let i = puzzle.board.length - 1; i >= 0; i--) {
            swap(i)
        }
    } else if (shift < 0) {
        for (let i = 0; i < puzzle.board.length; i++) {
            swap(i)
        }
    }

    return newBoard
}
