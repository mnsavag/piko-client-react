import React, { useState } from "react"
import { FaBars } from "react-icons/fa"
import styles from "./Navbar.module.css"
import Modal from "../Modal/Modal.jsx"

const NavBar = () => {
    const [showLinks, setShowLinks] = useState(false)
    const [modal, setModal] = useState(false)

    const registerLoginHandler = () => {
        setModal(true)
    }

    return (
        <nav>
            <div className={styles.navCenter}>
                <Modal visible={modal} setVisible={setModal}>
                    Coming Soon
                </Modal>

                <div className={styles.navHeader}>
                    <a className={styles.logo} href="/">Piku</a>
                    <button 
                        className={styles.navToggle}
                        onClick={() => setShowLinks(!showLinks)}
                    >
                        <FaBars/>
                    </button>
                </div>
                
                <div
                    className={`${
                        showLinks ? styles.linksContainer + " " + styles.showContainerFirst :
                        styles.linksContainer
                    }`}
                >
                    <ul className={styles.links}>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/creation">Create a Championship</a>
                        </li>
                    </ul>
                </div>
                

                <div
                    className={`${
                        showLinks ? styles.linksContainer + " "  + styles.showContainer :
                        styles.linksContainer
                    }`}
                >
                    <ul className={styles.links}>
                        <li>
                            <a href="#" onClick={registerLoginHandler}>Register</a>
                        </li>
                        <li>
                            <a href="#" onClick={registerLoginHandler}>Log In</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
