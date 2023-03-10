import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useAppDispatch, useAppSelector } from "../hooks/redix-hook";
import { changeCheckMode } from "../slices/calculator";
import LayoutsCalculator from "../components/layouts-calculator";
import BoxCalculator from "../components/box-calculator";
import { useCallback, useState } from "react";

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const checkMode = useAppSelector(state => state.calculator.checkMode);

  const callbacks = {
    reverseCheckMode: useCallback(() => {
      dispatch(changeCheckMode());
    }, [])
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BoxCalculator reverseCheckMode={callbacks.reverseCheckMode} checkMode={checkMode}/>
    </DndProvider>
  );
}

export default App;