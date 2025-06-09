import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './edit-company.module.scss'
import { ContactInput } from '../inputs/contact-input';
import PrimaryBtn from '../buttons/primary-btn';
import axios from 'axios';
import baseURL from '../../service/constant';
import EditedToast from '../text/edit-toast';


const EditCompany = ({ company, onClose }) => {
    const [name, setName] = useState('');
        const [logo, setLogo] = useState(null);
        const [description, setDescription] = useState('');
        const [location, setLocation] = useState('');
        const [website, setWebsite] = useState('')
        const [showToast, setShowToast] = useState(false);
        const [err, setErr] = useState()
        const [loader, setLoader] = useState(false);

        const editCompany = async (e) => {
               e.preventDefault();
            setLoader(true)
            try {
              const formData = new FormData();
              formData.append('name', name);
              formData.append('id', company?._id)
              formData.append('description', description);
              formData.append('logo', logo);
              formData.append('location', location);
              formData.append('website', website);
        
              
              const token = localStorage.getItem("token"); // if token is required
              
              const response = await axios.put(
                `${baseURL}/company/api/edit-company`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // optional
                  },
                }
              );
              
              console.log("Comany Edited Successfully", response.data);
              setShowToast(true);
setTimeout(() => setShowToast(false), 5000);

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
    <div >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <MdClose style={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={onClose} />
      </div>
      {showToast && <EditedToast txt={'Company Edited'} show={showToast}/>}
      <h4 style={{marginBottom: '10px'}}>Edit Company: {company.name}</h4>
         <div className={`${styles.edit_company}`}>
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
                marginTop: '10px',
                marginBottom: '10px'
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></ContactInput>
            <ContactInput
              placeholder={"Location"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                marginBottom: '10px'
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
                marginBottom: '10px'
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
                marginBottom: '10px'
              }}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            ></ContactInput>
          </div>
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
             <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} onClick={editCompany}>
            Edit Company
          </PrimaryBtn>
          {err && <div className="text-danger" style={{textAlign: 'start', marginTop: '10px'}}><small>{err}</small></div>}
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
