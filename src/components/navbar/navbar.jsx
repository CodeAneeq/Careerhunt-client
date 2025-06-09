import React, { useContext, useState } from "react";
import styles from "./navbar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/features/user-slice";
import CodeMart from "../../assets/imgs/logo.PNG";
import PrimaryBtn from "../buttons/primary-btn";
import { openSidebar } from "../../redux/features/sidebar-slice";
import defaultPic from '../../assets/imgs/default-img.png';


export const Navbar = () => {
  const profileImg = useSelector(state => state?.user?.data?.profile?.profileImg) || defaultPic
  const isLogin = useSelector(state => state?.user?.isLogin);
  const role = useSelector(state => state?.user?.data?.role);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signOut = () => {
    dispatch(removeUser());
    navigate('/auth/signup')
  }
  const sidebarOpen = () => {
    console.log("Dispatching openSidebar()");
    dispatch(openSidebar())
  }
  const navigateProfile = () => {
    if (isLogin) {
      navigate('/profile/student');
    }
  }
    return (
    <>
     <Sidebar></Sidebar>
     { role === 'recruiter' ? <nav className={`navbar navbar-expand-lg  ${styles.app_navbar_container}`}>
      <div className="container">
        <a className="navbar-brand p-0" href="#">
          <img className={`${styles.logo}`} src={CodeMart} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={sidebarOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${styles.ul_div} collapse navbar-collapse d-none`} id="navbarSupportedContent">
          <ul className={`${styles.ul} navbar-nav mx-auto mb-2 mb-lg-0`}>
            <li className="nav-item mx-3">
            <NavLink to='/recruiter/companies' className={`nav-link active ${styles.nav_link_item}`}>Company</NavLink>
            </li>
            <li className="nav-item mx-3">
            <NavLink to='/recruiter/jobs' className={`nav-link active ${styles.nav_link_item}`}>Jobs</NavLink>
            </li> 
          </ul>
          <div className={`${styles.profile_img_div}`}>
            <img src={profileImg} className={`${styles.img}`}></img>
          </div>
          <form className="d-flex align-items-center gap-4" role="search"> 
           <NavLink to={isLogin ? '' : '/auth/signup'}>
              <PrimaryBtn onClick={isLogin ? signOut : ""}>
                {isLogin ? "Sign Out" : "Sign Up"}
              </PrimaryBtn>
           </NavLink>
          </form>
        </div>
      </div>
    </nav> : <nav className={`navbar navbar-expand-lg  ${styles.app_navbar_container}`}>
      <div className="container">
        <a className="navbar-brand p-0" href="#">
          <img className={`${styles.logo}`} src={CodeMart} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={sidebarOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${styles.ul_div} collapse navbar-collapse d-none`} id="navbarSupportedContent">
          <ul className={`${styles.ul} navbar-nav mx-auto mb-2 mb-lg-0`}>
            <li className="nav-item mx-3">
            <NavLink to='/' className={`nav-link active ${styles.nav_link_item}`}>Home</NavLink>
            </li>
            <li className="nav-item mx-3">
            <NavLink to='/jobs-with-filter' className={`nav-link active ${styles.nav_link_item}`}>Jobs</NavLink>
            </li>
            <li className="nav-item mx-3">
            <NavLink to='/browse-jobs' className={`nav-link active ${styles.nav_link_item}`}>Browse</NavLink>
            </li>
          </ul>
          <div className={`${styles.profile_img_div}`}>
            <img src={profileImg} onClick={navigateProfile} className={`${styles.img}`}></img>
          </div>
          <form className="d-flex align-items-center gap-4" role="search"> 
           <NavLink to={isLogin ? '' : '/auth/signup'}>
              <PrimaryBtn onClick={isLogin ? signOut : ""}>
                {isLogin ? "Sign Out" : "Sign Up"}
              </PrimaryBtn>
           </NavLink>
          </form>
        </div>
      </div>
    </nav>}
          </>
  );
};

export default Navbar;
