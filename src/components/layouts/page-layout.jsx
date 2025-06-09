// import React from 'react'
// import Navbar from '../navbar/navbar'
// import Footer from '../../components/footer/footer.jsx'

// const PageLayout = ({children}) => {
//   return (
//     <>
//     <Navbar></Navbar>
//     {children}
//     <Footer></Footer>
//     </>
//   )
// }

// export default PageLayout

import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../../components/footer/footer.jsx';
import styles from './layouts.module.scss'; // ✅ New CSS file

const PageLayout = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <main className={styles.scrollArea}>
        {children}
      </main>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
