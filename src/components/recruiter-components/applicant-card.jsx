import React, { useState } from "react";
import styles from "./company-card.module.scss";
import baseURL from "../../service/constant";

const ApplicantCard = (props) => {
  

  return (
    <>
      <tr className={styles.table_row}>
        <td className={`${styles.text_cell} ${styles.title}`}>{props.name}</td>
        <td className={`${styles.text_cell} ${styles.title}`}>{props.email}</td>
        <td className={`${styles.text_cell} ${styles.title}`}>{props.contact}</td>
        <td className={`${styles.text_cell} ${styles.title}`}>
            <a href={`${props.resumeLink}`} target="_blank"  rel="noopener noreferrer">{props.resume}</a></td>
        <td className={`${styles.text_cell} ${styles.date}`}>{props?.date}</td>
        <td className={styles.text_cell}>
              <select
                className={styles.text_input}
                value={props.status}
                onChange={(e) => {
              props.onStatusChange(props.applicationId, e.target.value);
            }}              >
                <option value="" disabled>Change Status</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
         </td>
      </tr>
    </>
  );
};

export default ApplicantCard;
