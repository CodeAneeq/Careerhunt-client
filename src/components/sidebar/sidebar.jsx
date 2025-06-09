import React from 'react';
import styles from '../sidebar/sidebar.module.scss';
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/features/user-slice';
import { closeSidebar } from '../../redux/features/sidebar-slice';
import PrimaryBtn from '../buttons/primary-btn';
import defaultPic from '../../assets/imgs/default-img.png';

export const Sidebar = () => {
  const profileImg = useSelector(state => state?.user?.data?.profile?.profileImg) || defaultPic;
  const is_sidebar = useSelector(state => state?.sidebar?.isOpen);
  const isLogin = useSelector(state => state?.user?.isLogin);
  const role = useSelector(state => state?.user?.data?.role);

  const dispatch = useDispatch();

  const sidebarClass = is_sidebar
    ? `${styles.sidebar_container} ${styles.active}`
    : styles.sidebar_container;

  const signOut = () => {
    dispatch(removeUser());
  };

  const sidebarClose = () => {
    dispatch(closeSidebar());
  };

  return role === "recruiter" ? (
    <aside className={sidebarClass}>
      <span className={styles.close_sidebar_icon} onClick={sidebarClose}><RxCross1 /></span>
      <div className={styles.sidebar_content_container}>
        <div className={styles.nav_link_container}>
          <ul>
            <li>
              <NavLink to='/recruiter/companies' className={`nav-link active ${styles.nav_link_item}`}>Company</NavLink>
            </li>
            <li>
              <NavLink to='/recruiter/jobs' className={`nav-link active ${styles.nav_link_item}`}>Jobs</NavLink>
            </li>
            <li>
              <NavLink to='/recruiter/add-job' className={`nav-link active ${styles.nav_link_item}`}> Add Job</NavLink>
            </li>
            <li>
              <NavLink to='/recruiter/add-company' className={`nav-link active ${styles.nav_link_item}`}> Add Company</NavLink>
            </li>
            <div className={`${styles.profile_img_div}`}>
              <img src={profileImg} className={`${styles.img}`} alt="profile" />
              <form className="d-flex align-items-center gap-4" role="search"> 
                <NavLink to={isLogin ? '' : '/auth/signup'}>
                  <PrimaryBtn onClick={isLogin ? signOut : undefined}>
                    {isLogin ? "Sign Out" : "Sign Up"}
                  </PrimaryBtn>
                </NavLink>
              </form>
            </div>
          </ul>
        </div>
      </div>
    </aside>
  ) : (
    <aside className={sidebarClass}>
      <span className={styles.close_sidebar_icon} onClick={sidebarClose}><RxCross1 /></span>
      <div className={styles.sidebar_content_container}>
        <div className={styles.nav_link_container}>
          <ul>
            <li>
              <NavLink to='/' className={`nav-link active ${styles.nav_link_item}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={`nav-link active ${styles.nav_link_item}`}>Browser</NavLink>
            </li>
            <li>
              <NavLink to='/about' className={`nav-link active ${styles.nav_link_item}`}>Jobs</NavLink>
            </li>
            <div className={`${styles.profile_img_div}`}>
              <img src={profileImg} className={`${styles.img}`} alt="profile" />
              <form className="d-flex align-items-center gap-4" role="search"> 
                <NavLink to={isLogin ? '' : '/auth/signup'}>
                  <PrimaryBtn onClick={isLogin ? signOut : undefined}>
                    {isLogin ? "Sign Out" : "Sign Up"}
                  </PrimaryBtn>
                </NavLink>
              </form>
            </div>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
