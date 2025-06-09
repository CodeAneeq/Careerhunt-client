import React from 'react'
import styles from './text.module.scss'

const BorderText = (props) => {
  return (
    <div><p className={`${styles.first_heading}`}>{props.txt}</p></div>
  )
}

export default BorderText