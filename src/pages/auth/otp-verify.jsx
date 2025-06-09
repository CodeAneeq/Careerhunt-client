import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/layouts/auth-layout";
import styles from "./auth.module.scss";
import PrimaryBtn from "../../components/buttons/primary-btn";
import { Link, useNavigate } from "react-router-dom";
import { Helpers } from "../../service/helper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addEmailForOTP, addUser } from "../../redux/features/user-slice";
import baseURL from "../../service/constant";
import OtpInput from "react-otp-input";

const OtpVerifyPage = () => {
  const [authError, setAuthError] = useState("");
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const email = useSelector(state => state.user.email)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email) {
      navigate('/auth/signup')
    }
  }, [email, navigate])


  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    let otpError = "";

    if (otp.length < 6) {
      otpError = "Fill OTP Code"
    }

    if (otpError) {
      setAuthError(otpError);
    } else {
      setLoader(true);
      try {
        const payload = { otp, email };
        const response = await axios.post(
          `${baseURL}/user/api/verify-otp`,
          payload
        );
        if (response?.data?.status?.toLowerCase() == "success") {
          console.log(response?.data?.message, "Otp Success");
          setAuthError("");
          navigate('/auth/reset-password');
          
        } else {
          console.log(response?.data?.message);
        }
        setLoader(false);
      } catch (error) {
        console.log(error);
        setAuthError(error?.response?.data?.message);
        setLoader(false);
      }
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="auth_heading">Verify</h1>
        <p className="auth_title mt-3">Your code was sent to you via email</p>
        {/* <form className="mt-4" > */}
        <form className="mt-4" onSubmit={handleVerifyOTP}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={'otp-container'}
            inputStyle={'otp-inputs'}
            placeholder="000000"
            renderSeparator={<span>&nbsp;</span>}
            renderInput={(props) => <input {...props} />}
          />

          <div className={styles.button_wrapper}>
            <PrimaryBtn
              loading={loader ? true : false}
              disabled={loader ? true : false}
              type="submit"
            >
              Verify
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
};


export default OtpVerifyPage;
