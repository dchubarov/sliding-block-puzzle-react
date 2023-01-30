import {FC, useEffect, useRef, useState} from "react";
import Puzzle, {brickCoordinatesToIndex, isEmptyBoardElement} from "../puzzle";
import BoardInterior from "./BoardInterior";

interface Props {
    puzzle: Puzzle
    fitWidth: number
    fitHeight: number
}

interface SlideState {
    cellIndex: number
    originX: number
    originY: number
}

const Board: FC<Props> = ({puzzle, fitWidth, fitHeight}) => {
    const [slideState, setSlideState] = useState<SlideState | undefined>();
    const baseRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const cellSize = Math.min(Math.ceil(fitWidth / puzzle.uw), Math.ceil(fitHeight / puzzle.uh));

    useEffect(() => {
        const element = baseRef.current
        if (!element) return;

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault()

            const cellIndex = brickCoordinatesToIndex(puzzle,
                Math.floor(e.offsetX / cellSize),
                Math.floor(e.offsetY / cellSize));

            if (cellIndex !== undefined && !isEmptyBoardElement(puzzle.board[cellIndex])) {
                setSlideState({
                    cellIndex: cellIndex,
                    originX: e.clientX,
                    originY: e.clientY,
                });
            }

        }

        element.addEventListener("mousedown", handleMouseDown);
        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
        }
    }, [puzzle, cellSize]);

    useEffect(() => {
        if (!slideState) return;

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - slideState.originX;
            const dy = e.clientY - slideState.originY;
            if (overlayRef.current) {
                overlayRef.current.style.marginLeft = `${dx}px`
                overlayRef.current.style.marginTop = `${dy}px`
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            setSlideState(undefined);
        }

        const handleBlur = () => {
            setSlideState(undefined);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("blur", handleBlur);
        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [slideState]);

    return (
        <>
            <BoardInterior
                puzzle={puzzle}
                cellSize={cellSize}
                showExcept={slideState && puzzle.board[slideState.cellIndex]}
                ref={baseRef}
            />

            {slideState && <BoardInterior
                puzzle={puzzle}
                cellSize={cellSize}
                showOnly={puzzle.board[slideState.cellIndex]}
                ref={overlayRef}
                overlay
            />}
        </>
    )
}

export default Board;
