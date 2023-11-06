import React from "react"
import styles from "./CardCreation.module.css"

import Input from "../Input/Input.jsx"
import Button from "../Button/Button.jsx"
import ImageUploader from "../ImageUploader/ImageUploader.jsx"


const CardCreation = ({ id, index, name, maxNameLen, imageURL, 
                        imageUploaderCallback, deleteHandler, inputHandler }) => {
    return (
        <div className={styles.form}>
            { imageURL !== "" ?
                <img 
                    className={styles.variantPreview}
                    src={imageURL}
                />
                :
                <ImageUploader
                    styles={styles.variantPreview}
                    callback={imageUploaderCallback}
                />
            }

            <h4>Option {id}</h4>
            <div className={styles.titleData}>
                <p>Name:</p>
                <p>{name.length}/{maxNameLen}</p>
            </div>
            <div className={styles.marginBottom}>
                <Input
                    id={index}
                    value={name}
                    onChange={(event) => inputHandler(index, event.target.value)}
                />
            </div>

            <Button
                id={id}
                className={styles.buttonDelete}
                onClick={deleteHandler}
            >
                Delete
            </Button>
        </div>
    )
}

export default CardCreation