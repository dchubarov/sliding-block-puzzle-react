import Puzzle, {BoardElement} from "./puzzle";

const PuzzlePresets = {
    huarong(): Partial<Puzzle> {
        return {
            uw: 4,
            board: [
                "ZF", "CC", "CC", "MC",
                "ZF", "CC", "CC", "MC",
                "ZY", "GY", "GY", "HZ",
                "ZY", "S1", "S2", "HZ",
                "S3", "  ", "  ", "S4",
            ],
            boardStyle: {
                backgroundImage: "board.png",
            },
            brickStyle: (brick: BoardElement) => {
                let bi;
                if (brick) {
                    if (brick.startsWith("S"))
                        bi = "s.png";
                    else
                        bi = `${brick.toLowerCase()}.png`
                }
                return {
                    backgroundColor: "transparent",
                    backgroundImage: bi,
                    showContents: false,
                }
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
            brickStyle: (brick: BoardElement) => ({
                foregroundColor: "#454545",
                backgroundImage: ["1", "3", "6", "8", "9", "11", "14"].includes(brick ?? "") ? "red.png" : "white.png",
                backgroundColor: "transparent",
                showContents: true,
            })
        }
    }
}

export type PuzzlePresetName = keyof typeof PuzzlePresets;

export default PuzzlePresets;
