import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/auth-layout'
import { TextInput } from '../../components/inputs/text-input';
import PrimaryBtn from '../../components/buttons/primary-btn';
import styles from "./student.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../service/constant';
import axios from 'axios';
import { addUser } from '../../redux/features/user-slice';


const StudentDetails = () => {
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState(null);
    const [skills, setSkills] = useState('');
    const [authError, setAuthError] = useState("");
    const [loader, setLoader] = useState(false);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state?.user?.data);

    const onSubmitDetails = async (e) => {
    e.preventDefault();
      setLoader(true);
      try {
         const formData = new FormData();
    formData.append("bio", bio);
formData.append("skills", JSON.stringify(skills.split(',').map(skill => skill.trim())));
    if (resume) formData.append("resume", resume);
    const token = localStorage.getItem("token"); 
 const response = await axios.post(`${baseURL}/user/api/student-details`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // optional
        }
      });
      console.log(response);
      
      dispatch(addUser(response?.data?.data));
      setLoader(false)
        navigate('/');
      } catch (error) {
        setLoader(false)
           console.error(error);
      setAuthError(error?.response?.data?.message)
      }
    }

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="auth_heading">Enter Your Details</h1>
        <form className="mt-4" onSubmit={onSubmitDetails}>
          <TextInput
            placeholder="Bio"
            type="text"
            styles={{ marginBottom: "0" }}
            value={bio}
            onChange={setBio}
            required
          />
          <TextInput
            placeholder="Skills"
            type="text"
            styles={{ marginBottom: "5px", marginTop: "25px" }}
            value={skills}
            onChange={setSkills}
            required
          />
         

          {/* ✅ Profile Image Upload */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Upload Your Resume</label>
            <input
            name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full ms-2"
            />
          </div>

          <div className={styles.button_wrapper}>
            <PrimaryBtn
             loading={loader ? true : false}
              disabled={loader ? true : false}
              type="submit"
            >
              Save Details
            </PrimaryBtn>
            {authError && (
              <div className="text-danger">
                <small>{authError}</small>
              </div>
            )}
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default StudentDetails