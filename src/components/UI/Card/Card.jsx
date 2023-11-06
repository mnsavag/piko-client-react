import React from "react"
import CardPreview from "../CardPreview/CardPreview.jsx"
import styles from "./Card.module.css"
import { useNavigate } from "react-router-dom"


const Card = ({id, info, name, previewFirst, previewSecond}) => {
    const navigate = useNavigate()
    const buttonHandler = (event, url) => {
        event.preventDefault()
        navigate(url)
    }

    return (
        <div className={styles.singleCard}>
            <CardPreview
                previewFirst={previewFirst}
                previewSecond={previewSecond}
            />

            <footer className={styles.clearBoth}>
                <div className={styles.cardInfo}>
                    <h4>{name}</h4>
                    <p> {info} </p>
                </div>

                <div className={styles.buttonList}>
                    <button 
                        className={`${styles.button} ${styles.btnRed}`}
                        onClick={(event) => buttonHandler(event, `/contest/${id}`)}
                    >
                        start
                    </button>
            
                    <button 
                        className={`${styles.button} ${styles.btnYellow}`}
                        onClick={(event) => buttonHandler(event, `/contest/rating/${id}`)}
                    >
                        show rating
                    </button>
                </div>
            </footer>
        </div>
    )
}


export default Card