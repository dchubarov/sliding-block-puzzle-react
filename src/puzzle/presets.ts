import Puzzle from "./puzzle";

const PuzzlePresets = {
    huarong(): Partial<Puzzle> {
        return {
            uw: 4,
            board: [
                "A", "B", "B", "C",
                "A", "B", "B", "C",
                "D", "E", "E", "F",
                "D", "G", "H", "F",
                "I", " ", " ", "J",
            ],
            boardStyle: {
                backgroundImage: "board.png",
            },
            brickStyle: {
                showContents: true,
            }
        }
    },

    fifteen(): Partial<Puzzle> {
        const generateRandomBoard = () => {
            const b = [...Array(16).keys()].map(value => value === 0 ? " " : value.toString());
            b.sort(() => 0.5 - Math.random());
            return b;
        }

        return {
            uw: 4,
            board: generateRandomBoard(),
            brickStyle: {
                foregroundColor: "#454545",
                backgroundImage: "tile.png",
                backgroundColor: "transparent",
                showContents: true,
            }
        }
    }
}

export type PuzzlePresetName = keyof typeof PuzzlePresets;

export default PuzzlePresets;
