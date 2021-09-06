import React from "react";
import "./styles.scss";
import { ReactComponent as ArrowIcon } from "../../assets/images/arrow.svg";

type Props = {
    text: string;
}

const ButtonIcon = ({ text }: Props) => (
  <div className="default-button">
    <button className="btn btn-primary btn-icon">
      <h5>{text}</h5>
    </button>
    <div className="btn-icon-content">
      <ArrowIcon />
    </div>
  </div>
);

export default ButtonIcon;
