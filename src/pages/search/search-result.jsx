import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import axios from 'axios';
import baseURL from '../../service/constant';
import JobShowCard from '../../components/cards/job-show-card';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import styles from './search.module.scss'
const SearchResult = () => {
  const [searchParams] = useSearchParams();
  let title = searchParams.get("title")
  const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true); 

  const getJobs = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      let response = await axios.get(`${baseURL}/job/api/get-search-jobs?title=${title}`, 
        {
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
    setLoading(false)
  }
  }

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

  useEffect(() => {
    getJobs()
    getCompanies()
  }, [])
  return (
    <PageLayout>
      <div className={`${styles.job_container} container`}>
        <h2>Search result : {title}</h2>
      <div className={`${styles.jobs}`}>

      { 
      loading ? 
      <p>Loading....</p>: 
      jobs.length !== 0 ? jobs.map((item) => {
        const comp = company.find((it) => it._id === item.companyId)
        return <JobShowCard company={comp?.name} title={item?.title} description={item?.description} positions={item?.positions} type={item?.type} salary={item?.salary} location={item?.location}></JobShowCard>
      }) : <p>NOt Found</p>
    }
    </div>
      </div>
    </PageLayout>
  )
}

export default SearchResult