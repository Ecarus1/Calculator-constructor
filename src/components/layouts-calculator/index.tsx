import React from "react";

import "./style.css";

interface ILayoutsCalculator {
  children: React.ReactNode;
}

function LayoutsCalculator({children}: ILayoutsCalculator): React.ReactElement {
  return (
    <div className="layouts-calc">
      {children}
    </div>
  );
}

export default React.memo(LayoutsCalculator);