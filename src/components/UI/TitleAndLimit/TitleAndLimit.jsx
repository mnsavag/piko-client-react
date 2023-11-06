import React from "react"
import styles from "./TitleAndLimit.module.css"

const TitleAndLimit = ({title, value, maxValue, style}) => {
    const wrapperStyle = style ? style : styles.marginBottom
    return (
        <div className={`${styles.wrapper} ${wrapperStyle}`}>
            <p>{title}</p>
            <p>{value}/{maxValue}</p>
        </div>
    )
}

export default TitleAndLimit
