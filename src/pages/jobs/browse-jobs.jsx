import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import styles from './browse-jobs.module.scss'
import JobShowCard from '../../components/cards/job-show-card';
import axios from 'axios';
import baseURL from '../../service/constant';
import { useNavigate } from 'react-router-dom';

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
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
              setJobs(data);
          } catch (error) {
              console.log(error);   
          }
      }
      
  
      useEffect(() => {
          getJobs();
          getCompanies();
      }, [])
      const navigate = useNavigate();

      const navigated = (id) => {
        navigate(`/jobs-details/${id}`)
      }
  return (
    <PageLayout>
      <div className={`${styles.browse_container} container`}>
      <div className={`${styles.job_div}`}>
        <h2>Search Result ({jobs.length})</h2>
        <div className={`${styles.job_cards}`}>
          {
            jobs.map((item) => {
              const comp = company.find((it) => it._id === item.companyId)
              return <JobShowCard onClick={() => navigated(item._id)} company={comp?.name} title={item?.title} description={item?.description} positions={item?.positions} type={item?.type} salary={item?.salary} location={item?.location}></JobShowCard>

            })
          }
        </div>
      </div>
      </div>
    </PageLayout>
  )
}

export default BrowseJobs