import React from "react";
import "./styles.scss";
import { ReactComponent as ArrowIcon } from "../../assets/images/arrow.svg";

type Props = {
    text: string;
}

const ButtonIcon = ({ text }: Props) => (
  <div className="d-flex">
    <button className="btn btn-primary btn-icon">
      <h5>inicie agora a sua busca</h5>
    </button>
    <div className="btn-icon-content">
      <ArrowIcon />
    </div>
  </div>
);

export default ButtonIcon;