import React, { useState, useEffect } from "react"


const useImageValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [formatError, setFormatError] = useState(false)

    const [textErrors, setTextErrors] = useState({})

    useEffect(() => {
        let errorMessages = {}
        for (const validation in validations) {
            switch(validation) {
                case "format":
                    if (value && validations[validation].includes(value.type.toLowerCase())) {
                        setFormatError(false)
                        delete errorMessages[validation]
                    }
                    else {
                        setFormatError(true)
                        errorMessages = {...errorMessages, [validation]:"Preview format should be jpg/jpeg/png"}
                    }
                    break;

                case "isEmpty":
                    if (value) {
                        setEmpty(false)
                        delete errorMessages[validation]
                    }
                    else {
                        setEmpty(true)
                        errorMessages = {...errorMessages, [validation]: "Preview fields must not be empty"}
                    }
                    break;
            }
        }
        setTextErrors(errorMessages)
    }, [value])

    return {
        isEmpty,
        formatError,
        textErrors
    }
}

export default useImageValidation