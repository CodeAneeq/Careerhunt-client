import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import styles from './recruiter.module.scss'
import ApplicantCard from '../../components/recruiter-components/applicant-card';
import axios from 'axios';
import baseURL from '../../service/constant';
import { useParams } from 'react-router-dom';

const Applicants = () => {

   const [application, setApplication] = useState([]);
   const [user, setUser] = useState([])

     const { id } = useParams();
    const getApplication = async () => {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.get(`${baseURL}/application/api/get-applications/${id}`, {
                 headers: {
            Authorization: `Bearer ${token}`,
          },
            });
            let data = response?.data?.data;
            setApplication(data);
        } catch (error) {
            console.log(error);   
        }
    }

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.get(`${baseURL}/user/api/get-users`, {
                 headers: {
            Authorization: `Bearer ${token}`,
          },
            });
            let data = response?.data?.data;
            setUser(data);
        } catch (error) {
            console.log(error);   
        }
    }

const handleStatusChange = async (id, newStatus) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseURL}/application/api/change-status`,
      {
        id,
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );
    
    console.log('API Response:', response.data);
    
    if (response.data.status === "success") {
      getApplication(); // This refreshes the data
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

    useEffect(() => {
      getApplication()
      getUser()
    }, [])

  return (
    <PageLayout>
 <section className={ `${styles.section_container} container`}>
        <div className={`${styles.heading}`}>
           <h2>Applicants - ({application.length})</h2>
        </div>
          <table className={`${styles.adminTableContainer}`}>
      <thead className={`${styles.adminTable}`}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Resume</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  {application.map((item) => {
    const us = user.find((it) => it._id === item.userId);
             let fullResumeURL = us?.profile.resume;
  let fileName = fullResumeURL?.split("/").pop(); 
  console.log(fileName);
  

    return (
      <ApplicantCard
        key={item._id}
        resumeLink={us?.profile?.resume}
        applicationId={item._id}
        name={us?.name}
        email={us?.email}
        contact={us?.number}
        resume={fileName}
        date={item?.appliedAt}
        status={item.status}
        onStatusChange={handleStatusChange}
      />
    );
  })}
</tbody>
    </table>
    <p className={`${styles.footer_line}`}>A list of your registered companies</p>
        </section>
    </PageLayout>
  )
}

export default Applicants