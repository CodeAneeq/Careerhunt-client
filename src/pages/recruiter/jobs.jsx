import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import PrimaryBtn from '../../components/buttons/primary-btn'
import styles from './recruiter.module.scss'
import CompanyCard from '../../components/recruiter-components/company-card'
import axios from 'axios'
import baseURL from '../../service/constant'
import { NavLink, useNavigate } from 'react-router-dom'
import JobCard from '../../components/recruiter-components/job-card'
import EditCompany from '../../components/edit/edit-company'
import EditJob from '../../components/edit/edit-job'

const Jobs = () => {
    let navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState([]);
     const [showEdit, setShowEdit] = useState(false);
      const [selectedJob, setSelectedJob] = useState(null);
      const [loading, setLoading] = useState(true);
    
      const openEditJob = (job) => {
        setSelectedJob(job);
        setShowEdit(true);
      };
    
      const closeEditJob = () => {
        setShowEdit(false);
        setSelectedJob(null);
      };
    
    const applicantPageNavigated = (id) => {
        navigate(`/recruiter/job/${id}/applicants`)
    }

    const getCompanies = async () => {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.get(`${baseURL}/company/api/get-company`, {
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
    }

    const getJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.get(`${baseURL}/job/api/get-job`, {
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
    const deleteJob = async (id) => {
        try {
            const token = localStorage.getItem("token");
            let response = await axios.delete(`${baseURL}/job/api/del-job/${id}`, {
                 headers: {
            Authorization: `Bearer ${token}`,
          },
            });
            setJobs((prevJob) => prevJob.filter(item => item._id !== id));
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(() => {
        getJobs();
        getCompanies();
    }, [])

  return (
    <PageLayout>
        <section className={ `${styles.section_container} container`}>
        <div className={`${styles.btn_div}`}>
            <NavLink to={'/recruiter/add-job'}>
        <div style={{width: '200px'}}>
            <PrimaryBtn>
                Add Job
            </PrimaryBtn>
        </div>
        </NavLink>
        </div>
          <table className={`${styles.adminTableContainer}`}>
      <thead className={`${styles.adminTable}`}>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Date</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {
         loading ? <p>Loading.....</p> :     
          jobs.map((item) => {
            let comp = company.find((com) => com._id == item.companyId);            
           return <JobCard key={item._id} edit={() => openEditJob(item)} company={comp?.name} name={item.title} date={item?.createdAt} del={() => deleteJob(item._id)} applicant={() => applicantPageNavigated(item._id)} />
          })
        }
      </tbody>
    </table>
    <p className={`${styles.footer_line}`}>A list of your registered Jobs</p>

    {showEdit && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <EditJob job={selectedJob} onClose={closeEditJob}/>
            </div>
          </div>
        )}
        </section>
    </PageLayout>
  )
}

export default Jobs