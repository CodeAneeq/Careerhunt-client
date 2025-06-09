import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import FilterSidebar from '../../components/sidebar/filter-sidebar'
import axios from 'axios';
import baseURL from '../../service/constant';
import JobShowCard from '../../components/cards/job-show-card';
import PrimaryBtn from '../../components/buttons/primary-btn';
import styles from './jobs-with-filter.module.scss'
import { useNavigate, useParams } from 'react-router-dom';

const JobsWithFilter = () => {
  const [filterApply, setFilterApply] = useState(false);
    const [filter, setFilter] = useState({
      location: '',
      industry: '',
      salary: ''
    });

    const navigate = useNavigate();
    
          const navigated = (id) => {
            navigate(`/jobs-details/${id}`)
          }

    const [jobs, setJobs] = useState([])
    const [allJobs, setAllJobs] = useState([])
    const [company, setCompany] = useState([]);
    
    const emptyFilterJobs = () => {
      setFilter({
        location: '',
        industry: "",
        salary: ""
      })
      setFilterApply(false)
      setJobs([])

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
  
  // const getFilterJobs = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const payload = {
  //       location: filter.location,
  //       title: filter.industry,
  //       salary: filter.salary};
  //       let response = await axios.post(`${baseURL}/job/api/get-filter-jobs`, 
  //         payload,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         let data = response?.data?.data;
  //         setJobs(data);
  //         setFilterApply(true)
  // } catch (error) {
  //     console.log(error);   
  // }
  // }

  const getFilterJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        location: filter.location,
        title: filter.industry,
        salary: filter.salary
      };
  
      const response = await axios.post(`${baseURL}/job/api/get-filter-jobs`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: status => [200, 400, 404].includes(status)  // Accept 400 & 404 to handle in catch
      });
  
      if (response.status === 200) {
        setJobs(response.data.data);
        setFilterApply(true);
      } else if (response.status === 404) {
        setJobs([]);  // Clear previous jobs
        setFilterApply(true); // Show "No job found"
      } else if (response.status === 400) {
        setJobs([]);
        setFilterApply(false);
      }
  
    } catch (error) {
      console.error(error);
    }
  };
  

  const getAllJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(`${baseURL}/job/api/get-all-jobs`, 
        {
           headers: {
      Authorization: `Bearer ${token}`,
    },
      });
      let data = response?.data?.data;
      setAllJobs(data);
  } catch (error) {
      console.log(error);   
  }
  }

  useEffect(() => {
    getAllJobs()
    getCompanies()
  }, [])

  return (
    <PageLayout>
      <div className={`${styles.filter_page_container}`}>
      <FilterSidebar filter={filter} setFilter={setFilter}></FilterSidebar>
      <div className={`${styles.job_container}`}>
        <div className={`${styles.btns}`}>
        <PrimaryBtn onClick={getFilterJobs}>Apply Filters</PrimaryBtn>
        <PrimaryBtn onClick={emptyFilterJobs}>Reset Filters</PrimaryBtn>
        </div>
        <div className={`${styles.jobs}`}>
      {
  filterApply ? (
    jobs.length !== 0 ? (
      jobs.map((item) => {
        const comp = company.find((it) => it._id === item.companyId);
        return (
          <JobShowCard
          onClick={() => navigated(item._id)}
            key={item._id}
            company={comp?.name}
            title={item?.title}
            description={item?.description}
            positions={item?.positions}
            type={item?.type}
            salary={item?.salary}
            location={item?.location}
          />
        );
      })
    ) : (
      <p>No job found</p>
    )
  ) : (
    allJobs.map((item) => {
      const comp = company.find((it) => it._id === item.companyId);
      return (
        <JobShowCard
          key={item._id}
          onClick={() => navigated(item._id)}
          company={comp?.name}
          title={item?.title}
          description={item?.description}
          positions={item?.positions}
          type={item?.type}
          salary={item?.salary}
          location={item?.location}
        />
      );
    })
  )
}

      </div>
      </div>
      </div>
    </PageLayout>
  )
}

export default JobsWithFilter