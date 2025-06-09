import React from "react";
import styles from "./job-card.module.scss"; // Same styles file used
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const JobCard = (props) => {
  return (
    <tr className={styles.table_row}>
      <td className={`${styles.text_cell} ${styles.title}`}>{props.company}</td>
      <td className={`${styles.text_cell} ${styles.title}`}>{props.name}</td>
      <td className={`${styles.text_cell} ${styles.date}`}>{props?.date}</td>
      <td className={styles.text_cell_last}>
        <span><MdDeleteForever className={styles.del_btn} onClick={props.del} /></span>
        <span><FaUsers style={{color: "black", marginLeft:'20px'}} className={styles.del_btn} onClick={props.applicant} /></span>
        <span><MdEdit style={{color: "black", marginLeft:'20px', cursor: 'pointer'}} className={styles.del_btn} onClick={props.edit}/></span>
      </td>
    </tr>
  );
};

export default JobCard;
