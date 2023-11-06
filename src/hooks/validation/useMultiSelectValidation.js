import React, { useState, useEffect } from "react"


const useMultiSelectValidation = (countSelected, validations) => {
    const [minSelectedError, setMinSelectedError] = useState(true)
    const [maxSelectedError, setMaxSelectedError] = useState(false)

    const [textErrors, setTextErrors] = useState({})
    
    useEffect(() => {
        let errorMessages = {}
        for (const validation in validations) {
            switch(validation) {
                case "maxSelect":
                    if (validations[validation] < countSelected) {
                        setMaxSelectedError(true)
                        errorMessages = {...errorMessages, [validation]: "Number of selected tags exceeded\n"}
                    }
                    else { 
                        setMaxSelectedError(false)
                        delete errorMessages[validation]
                    }
                    break;
                case "minSelect":
                    if (countSelected < validations[validation]) { 
                        setMinSelectedError(true)
                        errorMessages = {...errorMessages, [validation]: "Please select at least 1 tag\n"}
                    }
                    else {
                        setMinSelectedError(false)
                        delete errorMessages[validation]
                    }
                    break;
            }
        }
        setTextErrors(errorMessages)
    }, [countSelected])

    return {
        minSelectedError,
        maxSelectedError,
        textErrors
    }
}

export default useMultiSelectValidation