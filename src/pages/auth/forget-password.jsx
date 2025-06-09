import React, { useState } from "react";
import AuthLayout from "../../components/layouts/auth-layout";
import styles from "./auth.module.scss";
import { TextInput } from "../../components/inputs/text-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { Link, useNavigate } from "react-router-dom";
import { Helpers } from "../../service/helper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addEmailForOTP, addUser } from "../../redux/features/user-slice";
import baseURL from "../../service/constant";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  console.log(email);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    let emailError = "";

    if (!Helpers.validateEmail(email)) {
      emailError = 'Invalid Email';
    }
    if (emailError) {
      setErrors({ email: emailError});
    } else {
      setLoader(true)
      try {
        const payload = { email };
        const response = await axios.post(`${baseURL}/user/api/send-otp`, payload);
        if (response?.data?.status == "success") {
            console.log(response, "Forgot Password Response");
            dispatch(addEmailForOTP(email));
            setErrors({ email: ""});
            navigate("/auth/otp-verify");   
        } else {
            console.log(response?.data?.message);
        }
        setLoader(false)
      } catch (error) {
        console.log(error);
        setAuthError(error?.response?.data?.message)
        setLoader(false)
      }
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="auth_heading">Forgot Password</h1>
        <p className="auth_title mt-3">Enter your Email below for sending OTP</p>
        <form className="mt-4" onSubmit={handleSendOTP}>
        {/* <form className="mt-4"> */}
          <TextInput
            styles={{ marginBottom: "0" }}
            value={email}
            onChange={setEmail}
            placeholder="Enter Your Email"
            type="text"
            required
            err_msg={errors.email}
          />
          <div className={styles.button_wrapper}>
            <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} type="submit">
              Send OTP
            </PrimaryBtn>
            {authError && <div className="text-danger"><small>{authError}</small></div>}
          </div>
          <span>
            Create a New Account?
            <Link to="/auth/signup" className={styles.login_link}>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
