import React, { useState } from "react";
import { TextInput } from "../../components/inputs/text-input";
import AuthLayout from "../../components/layouts/auth-layout";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { addUser } from "../../redux/features/user-slice";
import { useDispatch } from "react-redux";
import { Helpers } from "../../service/helper";
import axios from "axios";
import baseURL from '../../service/constant'

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("student");
  const [profileImage, setProfileImage] = useState(null); // ✅ new state
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [authError, setAuthError] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    let emailError = "", passwordError = "", nameError = "";
    if (!Helpers.validateEmail(email)) {
      emailError = 'Invalid Email';
    }
    if (!Helpers.validatePassword(password)) {
      passwordError = 'Password must be at least 8 characters';
    }
    if (!Helpers.validateName(name)) {
      nameError = 'Name must be at least 3 characters';
    }
    if (emailError || passwordError || nameError) {
      setErrors({ email: emailError, password: passwordError, name: nameError });
    } else {
      setLoader(true);
      try {
         const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("number", number);
    formData.append("role", role);
    if (profileImage) formData.append("profileImg", profileImage);
 const response = await axios.post(`${baseURL}/user/api/sign-up`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      localStorage.setItem("token", response?.data?.data?.token);   
      dispatch(addUser(response?.data?.data));
      setErrors({ email: "", password: "", name: "" });
      setLoader(false);
      if (response?.data?.data?.role === 'student') {
        navigate('/student-details');
      } else {
        navigate('/recruiter/companies');
      }
      } catch (error) {
        setLoader(false)
           console.error(error);
      setAuthError(error?.response?.data?.message)
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <AuthLayout>
      <div className="mt-4">
        <h1 className="auth_heading">Create an Account</h1>
        <p className="auth_title mt-3">Enter your details below</p>
        <form className="mt-4" onSubmit={onSubmitSignUp}>
          <TextInput
            placeholder="Name"
            type="text"
            styles={{ marginBottom: "0" }}
            value={name}
            onChange={setName}
            required
            err_msg={errors.name}
          />
          <TextInput
            placeholder="Email or Phone Number"
            type="text"
            styles={{ marginBottom: "5px", marginTop: "25px" }}
            value={email}
            onChange={setEmail}
            required
            err_msg={errors.email}
          />
          <TextInput
            placeholder="Password"
            type="password"
            styles={{ marginBottom: "5px", marginTop: "25px" }}
            value={password}
            onChange={setPassword}
            required
            err_msg={errors.password}
          />
          <TextInput
            placeholder="Number"
            type="number"
            styles={{ marginBottom: "5px", marginTop: "25px" }}
            value={number}
            onChange={setNumber}
            required
          />

           {/* Role Radio Buttons */}
          <div className={`${styles.role_btns} mt-4 mb-2`}>
            <label className={`${styles.label_one} mr-6`}>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                className="me-2"
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={role === "recruiter"}
                onChange={(e) => setRole(e.target.value)}
                className="me-2"
              />
              Recruiter
            </label>
          </div>

          {/* ✅ Profile Image Upload */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Upload Profile Image</label>
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
              Create Account
            </PrimaryBtn>
            {authError && (
              <div className="text-danger">
                <small>{authError}</small>
              </div>
            )}
          </div>
        </form>
        <span>
          Already have an account?{" "}
          <Link to="/auth/login" className={styles.login_link}>
            Login
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
