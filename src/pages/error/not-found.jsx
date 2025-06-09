import React from 'react'
import styles from './not-found.module.scss'
import PageLayout from '../../components/layouts/page-layout'
import PrimaryBtn from '../../components/buttons/primary-btn'
import { NavLink } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <PageLayout>
    <div className={`${styles.error_page_container} container`}>
      <p><span className='text-secondary'>Home / </span><span>404 Error</span></p>
      <div className={`${styles.main_content}`}>
      <h1>404 Not Found</h1>
      <p>You Visited page not found. You May Go Home page</p>
      <div className={`${styles.btn_div}`}>
      <NavLink to='/'><PrimaryBtn type="submit">Back To Home Page</PrimaryBtn></NavLink>
      </div>
      </div>
    </div>
    </PageLayout>
  )
}

export default NotFoundPage;