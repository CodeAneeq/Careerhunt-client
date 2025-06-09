import React, { useEffect, useState } from "react";
import styles from "./recruiter.module.scss";
import PageLayount from "../../components/layouts/page-layout";
import { ContactInput } from "../../components/inputs/contact-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import axios from "axios";
import baseURL from "../../service/constant";

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [skillsRequired, setSkillsRequired] = useState([]);
    const [salary, setSalary] = useState('');
    const [positions, setPositions] = useState('');
    const [experience, setExperience] = useState('');
    const [type, setType] = useState('');
    const [err, setErr] = useState()
    const [loader, setLoader] = useState(false);
    const [companies, setCompanies] = useState([])
    const [companyId, setCompanyId] = useState('')

       const getCompanies = async () => {
      try {
        const token = localStorage.getItem("token"); // if token is required      
      const response = await axios.get(
        `${baseURL}/company/api/get-company`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // optional
          },
        }
      )
      console.log(response?.data?.data);
      
      setCompanies(response?.data?.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    
    const createJob = async (e) => {
       e.preventDefault();
    setLoader(true)
    try {
      const jobData = {
  title,
  description,
  skillsRequired: skillsRequired.split(',').map(skill => skill.trim()),
  salary,
  location,
  experience,
  positions,
  type,
  companyId
};



      
      const token = localStorage.getItem("token"); // if token is required
      
      const response = await axios.post(
        `${baseURL}/job/api/add-job`,
        jobData,
        {
          headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
        }
      );
      
      console.log("JOb Created Successfully", response.data);
      alert("Job added!");
      // Reset inputs
      setLoader(false)
     setTitle('');
     setLocation('');
     setDescription('');
     setExperience('');
     setPositions('');
     setSalary('');
     setSkillsRequired([]);
     setType('');
      setCompanyId('')

    } catch (error) {
      console.log("Error:", error.message);
      setErr(error?.response?.data?.message)
      setLoader(false)
    }
    setErr("")
  };


  useEffect(() => {
    getCompanies()
  }, [])
    

  return (
    <PageLayount>
      <div className={`${styles.create_product}`}>
        <h1>Add New Job</h1>
        <div className={styles.input_section_product}>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Title"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></ContactInput>
            <ContactInput
              placeholder={"Location"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Description"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Skills Required"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Salary"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            ></ContactInput>
            <ContactInput
              placeholder={"Positions"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={positions}
              onChange={(e) => setPositions(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Experience"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            ></ContactInput>
            <ContactInput
              placeholder={"Type"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
  <select
    style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      width: "100%",
    }}
    value={companyId}
    onChange={(e) => setCompanyId(e.target.value)}
  >
    <option value="">Select Company</option>
    {companies.map((company) => (
      <option key={company._id} value={company._id}>
        {company.name}
      </option>
    ))}
  </select>
</div>

                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} onClick={createJob}>
            Add Job
          </PrimaryBtn>
          {err && <div className="text-danger" style={{textAlign: 'start', marginTop: '10px'}}><small>{err}</small></div>}
        </div>
        </div>
      </div>
    </PageLayount>
  );
};

export default AddJob;
