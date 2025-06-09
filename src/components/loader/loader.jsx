import React from 'react'
import styles from './loader.module.scss'
import { HashLoader } from 'react-spinners'
const Loader = () => {
  return (
    <>
        <div className={`${styles.container}`}>
            <div className={`${styles.loader}`}>
            <HashLoader size={100} color='#000000' speedMultiplier={1.6} />
            </div>
        </div>
    </>
  )
}

export default Loader