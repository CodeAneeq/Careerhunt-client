import React from 'react'
import styles from './contact-input.module.scss'

export const ContactInput = (props) => {
  return (
    <div className={`${styles.contact_input_container}`}>
        <input type="text" name={props.name} placeholder={props.placeholder} style={props.style} value={props.value} onChange={props.onChange}/>
    </div>
  )
}
