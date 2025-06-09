import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layouts/page-layout";
import { useParams } from "react-router-dom";
import JobShowCard from "../../components/cards/job-show-card";
import axios from "axios";
import styles from './category.module.scss'
import baseURL from "../../service/constant";

const CategoryJobs = () => {
    let {title} = useParams();
    console.log(title);
    
    // const [title, setTitle] = useState();
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

    const getFilterJobs = async () => {
        try {
          const token = localStorage.getItem("token");
          const payload = {
           title: title
          }
          let response = await axios.get(`${baseURL}/job/api/get-category-jobs/${title}`, 
          payload,
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
      }
      }
    
      useEffect(() => {
        getFilterJobs()
        getCompanies()
      }, [])

    return (
        <PageLayout>
            <div className={`${styles.job_container} container`}>
                <h2>Jobs shows : {title}</h2>
        <div className={`${styles.jobs}`}>

       {
        jobs.length !== 0 ? 
           jobs.map((item) => {
               const comp = company.find((it) => it._id === item.companyId)
               return <JobShowCard company={comp?.name} title={item?.title} description={item?.description} positions={item?.positions} type={item?.type} salary={item?.salary} location={item?.location}></JobShowCard>
            }) : <p>No JObs Found of : {title}</p>
        }
        </div>
        </div>
    </PageLayout>
        
    )
}

export default CategoryJobs