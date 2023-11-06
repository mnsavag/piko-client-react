import React from "react"
import styles from "./CardPreview.module.css"
import { getBackgroundImageRemoteURL } from "../../../utils/url"


const CardPreview = ({previewFirst, previewSecond}) => {
    if (previewFirst && previewSecond) {
        return (
            <div>
                <div
                    className={styles.preview}
                    style={{backgroundImage: getBackgroundImageRemoteURL(previewFirst)}}
                />

                <div
                    className={styles.preview}
                    style={{backgroundImage: getBackgroundImageRemoteURL(previewSecond)}}
                />
            </div>
        )
    }
    else {
        return (
            <div>
                {previewFirst && 
                    <div 
                        className={styles.preview} 
                        style={{
                            width: "100%", 
                            backgroundImage: getBackgroundImageRemoteURL(previewFirst)
                        }}
                    />
                }
                {previewSecond && 
                    <div 
                        className={styles.preview} 
                        style={{
                            width: "100%", 
                            backgroundImage: getBackgroundImageRemoteURL(previewSecond)
                        }}
                    />
                }
            </div>
        )
    }
}

export default CardPreview