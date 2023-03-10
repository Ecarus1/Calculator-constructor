import React from "react";

import "./style.css";

interface IButton {
  title: string;
  callback: Function;
  zclass?: string;
  checkMode: boolean;
}

function Button({title, callback, zclass, checkMode}: IButton): React.ReactElement {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!checkMode) {
      callback();
    }
  }

  return (
    <button className={`button ${zclass}`} onClick={onClick}>{title}</button>
  );
}

export default React.memo(Button);