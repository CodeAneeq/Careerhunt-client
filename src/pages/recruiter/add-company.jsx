import React, { useState } from "react";
import styles from "./recruiter.module.scss";
import PageLayount from "../../components/layouts/page-layout";
import { ContactInput } from "../../components/inputs/contact-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import axios from "axios";
import baseURL from "../../service/constant";

const AddCompany = () => {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('')
    const [err, setErr] = useState()
    const [loader, setLoader] = useState(false);
    
    const createProduct = async (e) => {
       e.preventDefault();
    setLoader(true)
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('logo', logo);
      formData.append('location', location);
      formData.append('website', website);

      
      const token = localStorage.getItem("token"); // if token is required
      
      const response = await axios.post(
        `${baseURL}/company/api/add-company`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // optional
          },
        }
      );
      
      console.log("Comany Created Successfully", response.data);
      alert("Company added!");
      // Reset inputs
      setLoader(false)
     setName('');
setLocation('');
setWebsite('');
setDescription('');
setLogo([]);

    } catch (error) {
      console.log("Error:", error.message);
      setErr(error?.response?.data?.message)
      setLoader(false)
    }
    setErr("")
  };


    

  return (
    <PageLayount>
      <div className={`${styles.create_product}`}>
        <h1>Add New Company</h1>
        <div className={styles.input_section_product}>
          <div className={styles.input_section_row}>
<input
  type="file"
  className={styles.file_input}
  multiple
  onChange={(e) => setLogo(e.target.files[0])}
/>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Name"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder={"Website URL"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            ></ContactInput>
          </div>
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} onClick={createProduct}>
            Add Company
          </PrimaryBtn>
          {err && <div className="text-danger" style={{textAlign: 'start', marginTop: '10px'}}><small>{err}</small></div>}
        </div>
        </div>
      </div>
    </PageLayount>
  );
};

export default AddCompany;
