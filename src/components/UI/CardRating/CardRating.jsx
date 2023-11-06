import React from "react"
import styles from "./CardRating.module.css"

import { getStaticFilesURL } from "../../../utils/url.js"

const CardRating = ({name, image, place, winRate}) => {
    return (
        <div className={styles.cardRating}>
            <div className={styles.dataWrapper}>
                <div className={styles.place}>
                    <p>{place}</p>
                    <p>{Number(winRate.toFixed(2))}%</p>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={getStaticFilesURL() + image}/>
                </div>
                <div className={styles.name}>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}

export default CardRating