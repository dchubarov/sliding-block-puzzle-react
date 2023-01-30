import {FC} from 'react';
import styled from "styled-components";
import {useResizeDetector} from "react-resize-detector";
import Board from "./puzzle/components/Board";
import {usePuzzle} from "./puzzle";

const Container = styled.div`
  top: 2rem;
  left: 2rem;
  position: relative;
  width: calc(100vw - 4rem);
  height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App: FC = () => {
    const {width, height, ref} = useResizeDetector();
    const puzzle = usePuzzle();

    return (
        <Container ref={ref}>
            {(!!width && !!height) && <Board puzzle={puzzle} fitWidth={width} fitHeight={height}/>}
        </Container>
    );
}

export default App;