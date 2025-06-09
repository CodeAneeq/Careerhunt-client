import React from "react";
import styles from "./buttons.module.scss";

const PrimaryBtn = (props) => {
  return (
    <button
      className={styles.button_container}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">  Loading...</span></> : props.children}
    </button>
  );
};

export default PrimaryBtn