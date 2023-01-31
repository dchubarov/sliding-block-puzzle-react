import Puzzle from "./puzzle";

const PuzzlePresets = {
    huarong(): Partial<Puzzle> {
        return {
            board: [
                "A", "B", "B", "C",
                "A", "B", "B", "C",
                "D", "E", "E", "F",
                "D", "G", "H", "F",
                "I", " ", " ", "J",
            ],
            uw: 4,
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
        }
    }
}

export type PuzzlePresetName = keyof typeof PuzzlePresets;

export default PuzzlePresets;
