import Puzzle, {brickBounds, brickCanMove, brickIndexToInnerCoordinates, moveBrick} from "./puzzle";

test("simple brick movability", () => {
    const puzzle: Puzzle = {
        name: "test",
        board: [
            "LT", "", "", "RT",
            "", "", "X", "",
            "", "", "", "",
            "LB", "", "", "RB",
        ],
        uw: 4,
        uh: 4,
    }

    // empty cell is always unmovable
    expect(brickCanMove(puzzle, 1, "N")).toEqual(0)
    expect(brickCanMove(puzzle, 1, "S")).toEqual(0)

    // left-top corner (LT)
    expect(brickCanMove(puzzle, 0, "N")).toEqual(0)
    expect(brickCanMove(puzzle, 0, "W")).toEqual(0)
    expect(brickCanMove(puzzle, 0, "S")).toEqual(2)
    expect(brickCanMove(puzzle, 0, "E")).toEqual(2)

    // right-top corner (RT)
    expect(brickCanMove(puzzle, 3, "N")).toEqual(0)
    expect(brickCanMove(puzzle, 3, "W")).toEqual(2)
    expect(brickCanMove(puzzle, 3, "S")).toEqual(2)
    expect(brickCanMove(puzzle, 3, "E")).toEqual(0)

    // left-bottom corner (LB)
    expect(brickCanMove(puzzle, 12, "N")).toEqual(2)
    expect(brickCanMove(puzzle, 12, "W")).toEqual(0)
    expect(brickCanMove(puzzle, 12, "S")).toEqual(0)
    expect(brickCanMove(puzzle, 12, "E")).toEqual(2)

    // right-bottom corner (RB)
    expect(brickCanMove(puzzle, 15, "N")).toEqual(2)
    expect(brickCanMove(puzzle, 15, "W")).toEqual(2)
    expect(brickCanMove(puzzle, 15, "S")).toEqual(0)
    expect(brickCanMove(puzzle, 15, "E")).toEqual(0)

    // arbitrary cell (X)
    expect(brickCanMove(puzzle, 6, "N")).toEqual(1)
    expect(brickCanMove(puzzle, 6, "W")).toEqual(2)
    expect(brickCanMove(puzzle, 6, "S")).toEqual(2)
    expect(brickCanMove(puzzle, 6, "E")).toEqual(1)
});

test("compound brick movability", () => {
    const puzzle: Puzzle = {
        name: "test",
        board: [
            " ", " ", " ", " ", " ",
            " ", "X", " ", "O", "O",
            " ", " ", " ", "O", " ",
            " ", " ", "O", "O", " ",
        ],
        uw: 5,
        uh: 4,
    }

    // test moving compound brick (O)
    expect(brickCanMove(puzzle, 8, "N")).toEqual(1)
    expect(brickCanMove(puzzle, 8, "W")).toEqual(1) // blocked by X
    expect(brickCanMove(puzzle, 8, "S")).toEqual(0)
    expect(brickCanMove(puzzle, 8, "E")).toEqual(0)
});

test("move brick", () => {
    const puzzle: Puzzle = {
        name: "test",
        board: [
            " ", " ", " ", " ", " ",
            " ", "X", " ", "O", "O",
            " ", " ", " ", "O", " ",
            " ", " ", "O", "O", " ",
        ],
        uw: 5,
        uh: 4,
    }

    moveBrick(puzzle, 8, "W", 1)
    moveBrick(puzzle, 8, "N", 1)
    moveBrick(puzzle, 2, "E", 1)
    expect(puzzle.board).toEqual([
        ' ', ' ', ' ', 'O', 'O',
        ' ', 'X', ' ', 'O', ' ',
        ' ', ' ', 'O', 'O', ' ',
        ' ', ' ', ' ', ' ', ' '
    ]);
});

test("brick bounds and inner coordinates", () => {
    const puzzle: Puzzle = {
        name: "test",
        board: [
            "X", "Y", " ", " ", " ", "Y",
            " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ",
            " ", " ", " ", "Y", " ", " ",
            " ", " ", " ", " ", " ", "Z",

        ],
        uw: 6,
        uh: 5,
    }

    expect(brickBounds(puzzle, "*")).toStrictEqual([undefined, undefined, undefined, undefined]);
    expect(brickBounds(puzzle, "X")).toStrictEqual([0, 0, 0, 0]);
    expect(brickBounds(puzzle, "Y")).toStrictEqual([1, 0, 5, 3]);
    expect(brickBounds(puzzle, "Z")).toStrictEqual([5, 4, 5, 4]);

    expect(brickIndexToInnerCoordinates(puzzle, "X", 0)).toStrictEqual([0, 0]);
    expect(brickIndexToInnerCoordinates(puzzle, "Y", 1)).toStrictEqual([0, 0]);
    expect(brickIndexToInnerCoordinates(puzzle, "Y", 9)).toStrictEqual([undefined, undefined]);
    expect(brickIndexToInnerCoordinates(puzzle, "Y", 5)).toStrictEqual([4, 0]);
    expect(brickIndexToInnerCoordinates(puzzle, "Y", 21)).toStrictEqual([2, 3]);
    expect(brickIndexToInnerCoordinates(puzzle, "Z", 29)).toStrictEqual([0, 0]);
});
