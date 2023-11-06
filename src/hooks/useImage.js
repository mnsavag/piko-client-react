import { useState } from "react";
import useImageValidation from "./validation/useImageValidation";

export const useImage = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const valid = useImageValidation(value, validations)

    /* {file: name: url:} */
    const onChange = (imageData) => {
        imageData ? setValue(imageData.file) : setValue(null)
    }

    return {
        value,
        onChange,
        ...valid
    }
}
