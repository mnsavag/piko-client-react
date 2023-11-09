import React, { useEffect, useState } from "react"
import classes from "./ImageUploader.module.css"
import uploadCloudImage  from "../../../../public/assets/images/uploadcloud.png";


const ImageUploader = ({styles, callback}) => {
    const [file, setFile] = useState()
    const [name, setName] = useState()
    const [url, setURL] = useState()

    const accessFormat = ["image/jpg", "image/jpeg","image/png"]
    
    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = (event) => {
                setURL(event.target.result)
                if (callback) {
                    callback({file: file, name: name, url: event.target.result})
                }
            }
            reader.readAsDataURL(file)
        }
    }, [file])

    const onChange = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (file && accessFormat.includes(file.type.toLowerCase())) {
            setName(file.name.split(".")[0])
            setFile(file)
        }
    }

    return (
        <form className={classes.uploadForm}>
            <input
                type="file"
                accept="image/jpg, image/jpeg image/png"
                className={classes.uploadButton}
                onChange={(event) => onChange(event)}
            />
            <img
                src={url ? url : uploadCloudImage}
                className={styles}
            />
        </form>
    )
}

export default ImageUploader