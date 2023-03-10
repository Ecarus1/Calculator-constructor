/* eslint-disable no-useless-escape */
import React, { useCallback, useRef, useEffect } from "react";
import SourceBox from "../source-box";
import Button from "../button";
import stringMath from "string-math";

interface IItemCalc {
  name: string;
  setItems: Function;
  index: number;
  moveCardHandler: Function;
  isClone?: boolean;
  checkMode: boolean;
  mathStr: string;
  setMathStr: Function;
}

function ItemCalc({name, setItems, index, moveCardHandler, isClone, checkMode, mathStr, setMathStr}: IItemCalc): React.ReactElement{
  const span = useRef<HTMLSpanElement>(null);

  const resultCalc = useCallback(() => {
    try {
      const str = String(stringMath(mathStr.replace(/x/i, '*').replace(/,/i, '.')));
      setMathStr(str);
    } catch (error) {
      setMathStr('Не определено');
    }
  }, [mathStr, setMathStr]);

  useEffect(() => {
    const minSize = 1;
    const maxSize = 36;
    let size = maxSize;

    if(!span.current) return;
    console.log(span.current.scrollWidth)
    do {
      span.current.style.fontSize = size + "px";
      size = size - 0.1;
    } while (
      (span.current.clientWidth < span.current.scrollWidth) &&
      size > minSize
    );
  }, [mathStr, setMathStr]);

  switch (name) {
    case 'field':
      
      return (
        <SourceBox 
          zclass={"layouts-calc__box"} 
          name={"field"} 
          setItems={setItems} 
          index={index} 
          moveCardHandler={moveCardHandler}
          isClone={isClone}
          checkMode={checkMode}>
          <span ref={span}>{mathStr.length === 0 ? '0' : mathStr.split(/(?:[-+x\/])+/).at(-1)}</span>
        </SourceBox>
      );

    case 'sign':
      return (
        <SourceBox 
          zclass={"layouts-calc__sign"} 
          name={"sign"} 
          setItems={setItems} 
          index={index} 
          moveCardHandler={moveCardHandler}
          isClone={isClone}
          checkMode={checkMode}>
          <Button title="/" callback={() => setMathStr((prev: any) => prev + "/")} checkMode={checkMode}/>
          <Button title="x" callback={() => setMathStr((prev: any) => prev + "x")} checkMode={checkMode}/>
          <Button title="-" callback={() => setMathStr((prev: any) => prev + "-")} checkMode={checkMode}/>
          <Button title="+" callback={() => setMathStr((prev: any) => prev + "+")} checkMode={checkMode}/>
        </SourceBox>
      );

    case 'numbers':
      return (
        <SourceBox 
          zclass={"layouts-calc__sign layouts-calc__numbers"} 
          name={"numbers"} 
          setItems={setItems} 
          index={index} 
          moveCardHandler={moveCardHandler}
          isClone={isClone}
          checkMode={checkMode}>
          <Button title="7" callback={() => setMathStr((prev: any) => prev + "7")} checkMode={checkMode}/>
          <Button title="8" callback={() => setMathStr((prev: any) => prev + "8")} checkMode={checkMode}/>
          <Button title="9" callback={() => setMathStr((prev: any) => prev + "9")} checkMode={checkMode}/>
          <Button title="4" callback={() => setMathStr((prev: any) => prev + "4")} checkMode={checkMode}/>
          <Button title="5" callback={() => setMathStr((prev: any) => prev + "5")} checkMode={checkMode}/>
          <Button title="6" callback={() => setMathStr((prev: any) => prev + "6")} checkMode={checkMode}/>
          <Button title="1" callback={() => setMathStr((prev: any) => prev + "1")} checkMode={checkMode}/>
          <Button title="2" callback={() => setMathStr((prev: any) => prev + "2")} checkMode={checkMode}/>
          <Button title="3" callback={() => setMathStr((prev: any) => prev + "3")} checkMode={checkMode}/>
          <Button title="0" callback={() => setMathStr((prev: any) => prev + "0")} checkMode={checkMode}/>
          <Button title="," callback={() => setMathStr((prev: any) => prev + ",")} checkMode={checkMode}/>
        </SourceBox>
      );

    case 'equals':
      return (
        <SourceBox 
          zclass={"layouts-calc__sign layouts-calc__equals"} 
          name={"equals"} 
          setItems={setItems} 
          index={index} 
          moveCardHandler={moveCardHandler}
          isClone={isClone}
          checkMode={checkMode}>
          <Button title="=" callback={() => resultCalc()} zclass="equals" checkMode={checkMode}/>
        </SourceBox>
      );
  
    default:
      return (<></>);
  }
}

export default React.memo(ItemCalc);