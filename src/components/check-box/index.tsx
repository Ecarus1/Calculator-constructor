import React from "react";

import {ReactComponent as Eye} from "../../assets/eye.svg";
import {ReactComponent as EyeBlue} from "../../assets/eye-blue.svg";
import {ReactComponent as Arrow} from "../../assets/selector.svg"
import {ReactComponent as ArrowBlue} from "../../assets/selector-blue.svg"

import "./style.css";

interface ICheckBox {
  reverseCheckMode: () => void;
  checkMode: boolean;
}

function CheckBox({reverseCheckMode, checkMode}: ICheckBox): React.ReactElement {

  return (
    <div className="checkbox">
      <input type="checkbox" className="checkbox__check" name="checkbox" id="checkbox" onChange={() => reverseCheckMode()} checked={checkMode}/>

      <label className="checkbox__label" htmlFor="checkbox">
            <div className="checkbox__switcher"></div>

            <div className="checkbox__info">
              <div className="info-item">
                {checkMode ? <Eye/> : <EyeBlue/>}
                <span>Runtime</span>
              </div>

              <div className="info-item">
                {checkMode ? <ArrowBlue/> : <Arrow/>}
                <span>Constructor</span>
              </div>
            </div>
      </label>
    </div>
  );
}

export default React.memo(CheckBox);