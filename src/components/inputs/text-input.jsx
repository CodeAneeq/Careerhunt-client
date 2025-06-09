import React from 'react'
import styles from './text-input.module.scss'
import { FaUser } from "react-icons/fa";

export const TextInput = (props) => {
  return (
    <div>
        {/* icon */}
        <div className={styles.input_container} style={props.styles}>
            {props.isIcon && <span>{props.icon}</span>}

            <div className={styles.input_field}>
                <input
                    placeholder={props.placeholder}
                    type={props.type}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    />
            </div>
        </div>

        {props.required && <div><small className={styles.input_err}>{props.err_msg ?? "required"}</small></div>
        }
    </div>
  )
}