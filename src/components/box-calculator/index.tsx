import React, {useState, useCallback, useEffect} from "react";

import LayoutsCalculator from "../layouts-calculator";
import ReadyCalculator from "../ready-calculator";
import CheckBox from "../check-box";
import ItemCalc from "../item-calc";

import "./style.css";

interface IBoxCalculator {
  reverseCheckMode: () => void;
  checkMode: boolean
}

function BoxCalculator({reverseCheckMode, checkMode}: IBoxCalculator): React.ReactElement {
  const [mathStr, setMathStr] = useState('');
  const [items, setItems] = useState([
    {id: 1, name: 'field', clone: false},
    {id: 2, name: 'sign', clone: false},
    {id: 3, name: 'numbers', clone: false},
    {id: 4, name: 'equals', clone: false}
  ]);

  useEffect(() => {
    setMathStr('');
  }, [checkMode]);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if(dragItem && dragIndex !== items[0].id) {
      setItems((prevState => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      }));
    }
  };

  const returnItemsForColumnLeft = useCallback(() => {
    let arr = [];

    for (let i = 1; i <= items.length; i++) {
      arr.push(items.find(item => item.id === i))
    }

    return arr
            .map((item, index) => (
              <ItemCalc 
                key={item!.id} 
                name={item!.name} 
                setItems={setItems}
                index={index} 
                moveCardHandler={moveCardHandler}
                isClone={item!.clone}
                checkMode={checkMode}
                mathStr={mathStr}
                setMathStr={setMathStr}
              />
            ))
            // eslint-disable-next-line
  }, [items, checkMode, mathStr])

  const returnItemsForColumnRight = useCallback(() => {
    return items
            .filter(item => item.clone)
            .map((item, index) => (
              <ItemCalc 
                key={item.id} 
                name={item.name} 
                index={index} 
                moveCardHandler={moveCardHandler}
                setItems={setItems}
                checkMode={checkMode}
                mathStr={mathStr}
                setMathStr={setMathStr}
              />
            ))
            // eslint-disable-next-line
  }, [items, checkMode, mathStr])

  return (
    <div className="box-calc">
      <CheckBox reverseCheckMode={reverseCheckMode} checkMode={checkMode}/>

      <div className="box-calc__layout">
        {checkMode && 
          <LayoutsCalculator>
            {returnItemsForColumnLeft()}
          </LayoutsCalculator>
        }

        <ReadyCalculator>
          {returnItemsForColumnRight()}
        </ReadyCalculator>
      </div>
    </div>
  );
}

export default React.memo(BoxCalculator);