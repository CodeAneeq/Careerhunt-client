import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/layouts/page-layout';
import styles from './jobs-details.module.scss';
import axios from 'axios';
import baseURL from '../../service/constant';
import { useParams } from 'react-router-dom';
import PrimaryBtn from '../../components/buttons/primary-btn';
import { useDispatch, useSelector } from 'react-redux';
import EditedToast from '../../components/text/edit-toast';

const JobsDetails = () => {
  const [job, setJob] = useState([]);
  const [company, setCompany] = useState([]);
          const [showToast, setShowToast] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [txt, setTxt] = useState('Apply');
   const dispatch = useDispatch()
     const isLogin = useSelector(state => state?.user?.isLogin);

     const apply = () => {
      if (isLogin) {
        createApplication()
      } else {
 setShowToast(true);
setTimeout(() => setShowToast(false), 5000);
      }
     }

  let id = useParams();
  console.log(id.id);
  

  const getJob = async () => {
    try {
        const token = localStorage.getItem("token");
        let response = await axios.get(`${baseURL}/job/api/get-single-job/${id.id}`, {
             headers: {
        Authorization: `Bearer ${token}`,
      },
        });
        let data = response?.data?.data;
        console.log(data);
                      
        setJob(data);
    } catch (error) {
        console.log(error);   
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

      const companyName = company.find((item) => item._id === job.companyId);
      console.log(companyName);
      

      const createApplication = async () => {
        try {
          setIsLoading(true);
            const token = localStorage.getItem("token");
            const jobId = id
              let response = await axios.post(`${baseURL}/application/api/add-application`, jobId, {
                   headers: {
              Authorization: `Bearer ${token}`,
            },
            });
            let isApp = response?.data?.data?.isApply;
            console.log(isApp);
            
                        
            if (isApp == true) {
              setTxt("applied");
            }
        } catch (error) {
          console.log(error);
        } finally { 
          setIsLoading(false);
        }
      }

      const checkIfApplied = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}/application/api/get-applied-status/${id.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.applied === true) {
      setTxt("Applied");
    }
  } catch (error) {
    console.log("Error checking applied status", error);
  }
};

  
      

useEffect(() => {
  getJob()
  if (isLogin) {
    checkIfApplied()
  }
  getCompanies()
}, [])
  return (
    <PageLayout>
      <div className={`${styles.jobs_details_container} container`}>
        <div className={`${styles.one}`}>
          <div className={`${styles.btn_div}`}>
          <h3>{job.title}</h3>
                {showToast && <EditedToast txt={'PLease Login First'} show={showToast}/>}

          <div className={`${styles.btn}`}>

          <PrimaryBtn onClick={apply}>{isLoading ? "Loading..." : txt}</PrimaryBtn>
          </div>
          </div>
          <div className={styles.tags}>
                  <span className={`${styles.tag} ${styles.positions}`}>{job.positions} Positions</span>
                  <span className={`${styles.tag} ${styles.type}`}>{job.type}</span>
                  <span className={`${styles.tag} ${styles.salary}`}> Rs {job.salary}</span>
          </div>
        </div>
        <div className={`${styles.job_description}`}>
          <h4>Job Description</h4>
          <hr />
          <p><span>Role:</span> {job.title}</p>
          <p><span>Location:</span> {job.location}</p>
          <p><span>Description:</span> {job.description}</p>
          <p><span>Experience:</span> {job.experience}</p>
          <p><span>Salary:</span> {job.salary}</p>
          <p><span>Company:</span> {companyName?.name}</p>
          <p><span>Posted Date:</span> {job.createdAt}</p>

        </div>
      </div> 
    </PageLayout>
  )
}

export default JobsDetails