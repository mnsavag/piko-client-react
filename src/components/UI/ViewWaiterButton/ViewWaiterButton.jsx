import React from "react"
import styles from "./ViewWaiterButton.module.css"

const ViewWaiterButton = ({props}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.button} {...props}>
                Update...
            </div>
        </div>
    )
}

export default ViewWaiterButton
