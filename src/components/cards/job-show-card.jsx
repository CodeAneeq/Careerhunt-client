import React from 'react';
import styles from './jobShowCard.module.scss';

const JobShowCard = (props) => {
  return (
    <div className={styles.card} onClick={props.onClick}>
      <h4 className={styles.company}>{props.company}</h4>
      <p className={styles.location}>{props.location}</p>
      <h3 className={styles.position}>{props.title}</h3>
      <p className={styles.description}>
        {props.description}
      </p>
      <div className={styles.tags}>
        <span className={`${styles.tag} ${styles.positions}`}>{props.positions} Positions</span>
        <span className={`${styles.tag} ${styles.type}`}>{props.type}</span>
        <span className={`${styles.tag} ${styles.salary}`}> Rs {props.salary}</span>
      </div>
    </div>
  );
};

export default JobShowCard;
