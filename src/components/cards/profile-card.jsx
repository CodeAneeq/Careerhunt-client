import React from 'react';
import styles from './profile-card.module.scss';
import { FaEnvelope, FaPhone, FaPen } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ProfileCard = () => {
    const user = useSelector(state => state?.user?.data);
  let fullResumeURL = user?.profile?.resume;
  let fileName = fullResumeURL?.split("/").pop(); 

  return (
    <div className={styles.profileCard}>
      <div className={styles.header}>
        <img
          src={user?.profile?.profileImg}
          alt="Profile"
          className={styles.avatar}
        />
        <div className={styles.details}>
          <h4>{user?.name}</h4>
          <p>{user?.profile?.bio}</p>
          <div className={styles.contact}>
            <p><FaEnvelope /> {user?.email}</p>
            <p><FaPhone /> {user?.number}</p>
          </div>
          <div className={styles.skills}>
            <h5>Skills: </h5>
            <div>
            
            {
                user?.profile?.skills?.map((item) => (
                    <span>{item}</span>
                ))
            }
            </div>
          </div>
          <div className={styles.resume}>
            <h5>Resume : </h5>
            <a href={user?.profile?.resume} target='_blank'>{fileName}</a>
          </div>
        </div>
        <div className={styles.editIcon}>
          <FaPen />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
