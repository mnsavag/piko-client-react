import React, { useState, useEffect } from "react"


const useInputValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [maxLengthError, setMaxLengthError] = useState(false)

    const [textErrors, setTextErrors] = useState({})
    
    useEffect(() => {
        let errorMessages = {}
        for (const validation in validations) {
            switch(validation) {
                case "maxLength":
                    if (validations[validation] < value.length) {
                        setMaxLengthError(true)
                        errorMessages = {...errorMessages, [validation]: "Text length must not be exceeds maximum"}
                    }
                    else { 
                        setMaxLengthError(false)
                        delete errorMessages[validation]
                    }
                    break;
                case "isEmpty":
                    if (value) { 
                        setEmpty(false)
                        delete errorMessages[validation]
                    }
                    else {
                        setEmpty(true)
                        errorMessages = {...errorMessages, [validation]: "Input fields must not be empty"}
                    }
                    break;
            }
        }
        setTextErrors(errorMessages)
    }, [value])

    return {
        isEmpty,
        maxLengthError,
        textErrors
    }
}

export default useInputValidation