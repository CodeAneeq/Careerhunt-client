import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/layouts/auth-layout";
import styles from "./auth.module.scss";
import { TextInput } from "../../components/inputs/text-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { Link, useNavigate } from "react-router-dom";
import { Helpers } from "../../service/helper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeEmailForOTP } from "../../redux/features/user-slice";
import baseURL from "../../service/constant";

const ResetPasswordPage = () => {

  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [loader, setLoader] = useState(false);
  const email = useSelector(state => state?.user?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   useEffect(() => {
      if (!email) {
        navigate('/auth/login')
      }
    }, [email, navigate])


  const handleResetPassword = async (e) => {
    e.preventDefault();
    let error = ""

    if (!Helpers.validateEmail(email)) {
          error = 'Invalid Email';
    }

    if (error) {
      setAuthError(error);
    } else {
      setLoader(true)
      try {
        const payload = { email, password };
        const response = await axios.post(`${baseURL}/user/api/reset-password`, payload);
        console.log(response?.data?.data, "Reset Password Response");
        dispatch(removeEmailForOTP(email))
        setAuthError("")
        navigate('/auth/login')
        setLoader(false)
      } catch (error) {
        console.log(error);
        setAuthError(error?.response?.data?.message)
        setLoader(false)
        // setErrors({ email: "Login failed, please try again.", password: "" });
      }
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="auth_heading">Reset Password</h1>
        <p className="auth_title mt-3">Enter your new password</p>
        {/* <form className="mt-4"> */}
        <form className="mt-4" onSubmit={handleResetPassword}>
          <TextInput
            styles={{ marginBottom: "5px", marginTop: "25px" }}
            value={password}
            onChange={setPassword}
            placeholder="Password"
            type="password"
            required
            // err_msg={errors.password}
          />
          <div className={styles.button_wrapper}>
            <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} type="submit">
              Change Password
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

export default ResetPasswordPage;
