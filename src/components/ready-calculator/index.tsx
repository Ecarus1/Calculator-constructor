import React from "react";
import {useDrop} from "react-dnd";
import type { DropTargetMonitor } from 'react-dnd'

import {ReactComponent as Icon} from "../../assets/group.svg";

import "./style.css";

interface IReadyCalculator {
  children: React.ReactNode;
}

function ReadyCalculator({children}: IReadyCalculator): React.ReactElement {
  const isChildren = () => {
    if(children) {
      return Object.keys(children).length ? false : true;
    }
    return false
  }

  const isFirstModule = () => {
    if(isChildren() && isOver) {
      return {'background': '#F0F9FF'}
    }
  }

  const [{canDrop, isOver}, drop] = useDrop({
    accept: ['field', 'sign', 'numbers', 'equals'],
    drop: () => ({name: 'Column 2'}),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
      <div className={isChildren() ? 'ready-calc' : 'ready-calc ready-calc_off-border'} style={isFirstModule()} ref={drop}>
        {isChildren() ? 
          <div className="ready-calc__info">
            <Icon/>
            <div className="ready-calc__desc">
              <span className="ready-calc__title">Перетащи сюда</span>
              <span className="ready-calc__text">любой элемент</span>
              <span className="ready-calc__text">из левой панели</span>
            </div>
          </div> : 
          children
        }
      </div>
  );
}

export default React.memo(ReadyCalculator);