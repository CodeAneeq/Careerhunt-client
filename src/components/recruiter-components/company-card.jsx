import React from "react";
import styles from "./company-card.module.scss";
import { MdDeleteForever, MdEdit } from "react-icons/md";


const CompanyCard = (props) => {
  return (
    <>
      <tr className={styles.table_row}>
        <td>
          <div className={styles.img_container}>
            <img className={styles.product_img} src={props.img}/>
          </div>
        </td>
        <td className={`${styles.text_cell} ${styles.title}`}>{props.name}</td>
        <td className={`${styles.text_cell} ${styles.date}`}>{props?.date}</td>
        <td className={styles.text_cell}>
          <MdDeleteForever className={styles.del_btn} onClick={props.del} />
          <MdEdit style={{cursor: 'pointer'}} className={`${styles.editIcon}`} onClick={props.edit}></MdEdit>
        </td>
      </tr>
    </>
  );
};

export default CompanyCard;
