import React from "react"
import styles from "./EmptyTest.module.css"
import NavBar from "../../components/UI/Navbar/Navbar.jsx"

const EmptyTest = () => {
    return (
        <div>
            <NavBar/>
            <div className={styles.notFound}>
                Test is Empty
            </div>
        </div>
    )
}

export default EmptyTest