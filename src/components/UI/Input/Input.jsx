import React from "react"
import inputStyle from "./Input.module.css"
 

const Input = ({value, onChange, style, props}) => {
    return (
        <input 
            className={ `${inputStyle.inputApp} ${style}` } 
            value={value} 
            onChange={onChange} 
            {...props}
        />
    )
}


export default Input