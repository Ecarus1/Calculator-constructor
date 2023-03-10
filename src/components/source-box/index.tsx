import React, {useMemo, useRef} from "react";
import { DragSourceMonitor, useDrop } from 'react-dnd'
import {useDrag} from "react-dnd";
import { ICalcModule } from "../../interface";

interface ISourceBox {
  zclass: string;
  name: string;
  setItems: Function;
  index: number;
  moveCardHandler: Function;
  children: React.ReactNode;
  isClone?: boolean;
  checkMode: boolean;
}

function SourceBox({zclass, name, setItems, index, moveCardHandler, isClone, checkMode, children}: ISourceBox): React.ReactElement {
  const changeItemColumn = (currentItem: string, columnName: string) => {
    setItems((prevState: Array<ICalcModule>) => {
      return prevState.map((item: ICalcModule) => {
        return {
          ...item,
          clone: currentItem === item.name ? true : item.clone
        };
      });
    });
  }

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ['sign', 'numbers', 'equals'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any , monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset: any = monitor.getClientOffset()

      const hoverClientY = (clientOffset).y - hoverBoundingRect.top
      console.log(hoverClientY)

      //Выполняем перемещение только тогда, когда мышь пересекла половину высоты элементов
      //При перетаскивании вниз двигаться только тогда, когда курсор ниже 50%
      //При перетаскивании вверх двигаться только тогда, когда курсор выше 50%

      // Перетаскивание вниз
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Перетаскивание вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCardHandler(dragIndex, hoverIndex)

      //Примечание: здесь мы изменяем элемент монитора!
      //Обычно лучше избегать мутаций,
      //но здесь хорошо для производительности
      //чтобы избежать дорогостоящего поиска по индексу
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: name,
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult: any = monitor.getDropResult();

      if (dropResult && dropResult.name === "Column 2") {
        changeItemColumn(name, "Column 2")
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: checkMode,
  });

  
  const containerStyle = useMemo(
    () => ({
      opacity: isClone ? 0.5 : '',
      cursor: isDragging ? 'default' : 'move',
    }),
    [isDragging, isClone],
  );
  
  drag(drop(ref));

  const onDbClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.target as HTMLElement;

    if (parent.parentElement?.className.includes('ready-calc') && checkMode) {
      setItems((prevState: Array<ICalcModule>) => {
        return prevState.map((item: ICalcModule)  => {
          return {
            ...item,
            clone: name === item.name ? false : item.clone
          }
        });
      });
    }
  };

  const getClassCss = () => {
    let newCssClass = zclass;
    
    if (isClone === undefined) {
      newCssClass += " layouts-calc__draged";
    }

    if (checkMode) {
      newCssClass += " drag";
    }
    
    return newCssClass
  }

  return (
    <div className={getClassCss()} style={containerStyle} ref={ref} onDoubleClick={onDbClick}>
      {children}
    </div>
  );
}

export default React.memo(SourceBox);