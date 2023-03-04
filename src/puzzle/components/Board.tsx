import {FC, useEffect, useRef, useState} from "react";
import Puzzle, {brickCanMove, brickCoordinatesToIndex, BrickMovementDirection, isEmptyBoardElement} from "../puzzle";
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
    limitN: number
    limitW: number
    limitS: number
    limitE: number
}

const Board: FC<Props> = ({puzzle, fitWidth, fitHeight}) => {
    const [slideState, setSlideState] = useState<SlideState | undefined>();
    const baseRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const cellSize = Math.min(Math.ceil(fitWidth / puzzle.uw), Math.ceil(fitHeight / puzzle.uh));

    // TODO use pointerevents instead on mouseevents to handle both mouse and gestures

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
                    limitN: -cellSize * brickCanMove(puzzle, cellIndex, "N"),
                    limitW: -cellSize * brickCanMove(puzzle, cellIndex, "W"),
                    limitS: cellSize * brickCanMove(puzzle, cellIndex, "S"),
                    limitE: cellSize * brickCanMove(puzzle, cellIndex, "E"),
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

        let moveDirection: BrickMovementDirection | undefined = undefined;
        let moveAmount = 0;

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();

            if (overlayRef.current) {
                const dx = (e.clientX - slideState.originX);
                const dy = (e.clientY - slideState.originY);

                if (Math.abs(dy) > Math.abs(dx)) {
                    let margin = dy > 0 ? Math.min(dy, slideState.limitS) : Math.max(dy, slideState.limitN);
                    overlayRef.current.style.marginTop = `${margin}px`
                    overlayRef.current.style.marginBottom = `${-margin}px`
                    moveAmount = Math.round(Math.abs(margin)/cellSize);
                    moveDirection = dy > 0 ? "S" : "N";
                } else {
                    let margin = dx > 0 ? Math.min(dx, slideState.limitE) : Math.max(dx, slideState.limitW);
                    overlayRef.current.style.marginLeft = `${margin}px`
                    overlayRef.current.style.marginRight = `${-margin}px`
                    moveAmount = Math.round(Math.abs(margin)/cellSize);
                    moveDirection = dx > 0 ? "E" : "W";
                }
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            e.preventDefault();
            if (moveDirection && moveAmount > 0) {
                puzzle.move!(slideState.cellIndex, moveDirection, moveAmount);
            }
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
    }, [puzzle, cellSize, slideState]);

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
