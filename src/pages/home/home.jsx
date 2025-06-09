import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import styles from './home.module.scss'
import GlobalSearch from '../../components/searchBar/search-bar'
import BorderText from '../../components/text/border-text'
import JobShowCard from '../../components/cards/job-show-card'
import baseURL from '../../service/constant'
import axios from 'axios'
import CategorySlider from '../../components/slider/category-slider'
import { useNavigate } from 'react-router-dom'

const Home = () => {

   const [jobs, setJobs] = useState([]);
      const [company, setCompany] = useState([]);

      const navigate = useNavigate();

      const navigated = (id) => {
        navigate(`/jobs-details/${id}`)
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
          }
      }
      
  
      useEffect(() => {
          getJobs();
          getCompanies();
      }, [])
  return (
    <PageLayout>
    <div className={`${styles.home_container} container`}>
      <div className={`${styles.first_section}`}>
      <BorderText txt={"No. 1 Job Hunt Website"}/>
      <h1 className={`${styles.main_heading}`}>Search Apply & <br /> Get Your <span className={`${styles.span}`}>Dream Job</span></h1>
      <p>Your career journey starts here — find the perfect opportunity today.</p>
      <div className={`${styles.search_div}`}>
        <GlobalSearch></GlobalSearch>
      </div>
      <div className={`${styles.category_container}`}>
       <CategorySlider></CategorySlider>
      </div>
      </div>
      <div className={`${styles.job_div}`}>
        <h2>Latest and Top <span className={`${styles.span}`}>Jobs Opening</span></h2>
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

export default Home