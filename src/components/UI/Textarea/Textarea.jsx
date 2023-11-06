import React from "react"
import componentStyle from "./Textarea.module.css"

const Textarea = ({value, onChange, style, props}) => {
    return (
         <textarea
            className={`${componentStyle.textarea} ${style}`} 
            value={value} 
            onChange={onChange} 
            {...props}
        />
    )
}

export default Textarea