export type BoardElement = string | undefined
export type BoardElements = Array<BoardElement>

export type BrickMovementDirection = "N" | "W" | "S" | "E"

export default interface Puzzle {
    board: BoardElements
    uw: number
    uh: number

    move(index: number, direction: BrickMovementDirection, amount: number): void
}

function isEmptyBoardElement(s: BoardElement) {
    return (!s || !s.trim())
}

function brickCoordinatesToIndex(puzzle: Puzzle, x: number, y: number) {
    return y * puzzle.uw + x
}

function brickIndexToCoordinates(puzzle: Puzzle, index: number) {
    return [index % puzzle.uw, Math.floor(index / puzzle.uw)]
}

export function brickCanMove(puzzle: Puzzle, index: number, direction: BrickMovementDirection): number {
    const brick = puzzle.board[index]
    if (!brick) return 0;

    let minMoveAmount = (direction === "N" || direction === "S") ? puzzle.uh : puzzle.uw;
    const isClear = (x: number, y: number) => {
        const n = brickCoordinatesToIndex(puzzle, x, y)
        return puzzle.board[n] === brick || isEmptyBoardElement(puzzle.board[n])
    }

    for (let i = 0; i < puzzle.board.length; i++) {
        if (puzzle.board[i] !== brick) continue
        const [bx, by] = brickIndexToCoordinates(puzzle, i);
        let moveAmount = 0

        switch (direction) {
            case "N":
                if (by > 0) {
                    for (let j = by - 1; j >= 0; j--) {
                        if (!isClear(bx, j)) break
                        moveAmount++
                    }
                }
                break

            case "W":
                if (bx > 0) {
                    for (let j = bx - 1; j >= 0; j--) {
                        if (!isClear(j, by)) break
                        moveAmount++
                    }
                }
                break

            case "S":
                if (by < puzzle.uh - 1) {
                    for (let j = by + 1; j < puzzle.uh; j++) {
                        if (!isClear(bx, j)) break
                        moveAmount++
                    }
                }
                break

            case "E":
                if (bx < puzzle.uw - 1) {
                    for (let j = bx + 1; j < puzzle.uw; j++) {
                        if (!isClear(j, by)) break
                        moveAmount++
                    }
                }
                break
        }

        if (minMoveAmount > moveAmount) minMoveAmount = moveAmount
        if (moveAmount === 0) break
    }

    return minMoveAmount
}

export function moveBrick(puzzle: Puzzle, index: number, direction: BrickMovementDirection, amount: number) {
    const brick = puzzle.board[index]
    if (!brick || amount < 1 || brickCanMove(puzzle, index, direction) < amount)
        return false

    let shift = 0
    switch (direction) {
        case "N":
            shift = -amount * puzzle.uw
            break

        case "W":
            shift = -amount
            break

        case "S":
            shift = amount * puzzle.uw
            break

        case "E":
            shift = amount
            break
    }

    if (shift !== 0) {
        const swap = (n: number) => {
            if (puzzle.board[n] === brick) {
                const temp = puzzle.board[n + shift]
                puzzle.board[n + shift] = brick
                puzzle.board[n] = temp
            }
        }

        if (shift > 0) {
            for (let i = puzzle.board.length - 1; i >= 0; i--) {
                swap(i)
            }
        } else if (shift < 0) {
            for (let i = 0; i < puzzle.board.length; i++) {
                swap(i)
            }
        }

        return true
    }

    return false
}
