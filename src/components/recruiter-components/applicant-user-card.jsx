import React, { useState } from "react";
import styles from "./company-card.module.scss";
import baseURL from "../../service/constant";

const ApplicantUserCard = (props) => {


    return (
        <>
            <tr className={styles.table_row}>
                <td className={`${styles.text_cell} ${styles.title}`}>{props?.date}</td>
                <td className={`${styles.text_cell} ${styles.date}`}>{props?.name}</td>
                <td className={`${styles.text_cell} ${styles.date}`}>{props?.company}</td>
                <td className={`${styles.text_cell} ${styles.date}`}>{props?.status}</td>

            </tr>
        </>
    );
};

export default ApplicantUserCard;
