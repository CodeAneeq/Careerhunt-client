import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/cards/profile-card'
import styles from './user-profile.module.scss'
import PageLayout from '../../components/layouts/page-layout'
import axios from 'axios'
import baseURL from '../../service/constant'
import ApplicantUserCard from '../../components/recruiter-components/applicant-user-card'


const StudentProfile = () => {

  const [application, setApplication] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState([]);

   const getCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(`${baseURL}/company/api/get-all-company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response?.data?.data;
      setCompany(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getApplications = async () => {
    try {
      let token = localStorage.getItem('token');
      let response = await axios.get(`${baseURL}/application/api/get-application-user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // optional
          },
        });
      let data = response?.data?.data;
      console.log(data);
      
      setApplication(data);
    } catch (error) {
      console.log(error);
    }
  }

   const getJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.get(`${baseURL}/job/api/get-all-jobs`, {
                 headers: {
            Authorization: `Bearer ${token}`,
          },
            });
            let data = response?.data?.data;
            console.log(data);
            
            setJobs(data);
        } catch (error) {
            console.log(error);   
        } finally {
      setLoading(false);
    }
    }

  useEffect(() => {
    getApplications();
    getCompanies();
    getJobs()
  }, [])

  return (
    <PageLayout>

    <div className={`${styles.student_profile_container} container`}>
      <div>
    <ProfileCard/>
      </div>
      <div className={`${styles.applied_section}`}>
        <h2>Applied Jobs</h2>
        <table className={`${styles.adminTableContainer}`}>
                      <thead className={`${styles.adminTable}`}>
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
          application.map((item) => {
            const job = jobs.find((it) => it._id === item.jobId)
            const comp = company.find((it) => it._id === job.companyId);
            console.log(comp);
            
            return <ApplicantUserCard name={job?.title} date={item.appliedAt} company={comp?.name} status={item?.status}/>
          })
        }
                      </tbody>
                    </table>
        
      </div>
    </div>
    </PageLayout>
  )
}

export default StudentProfile