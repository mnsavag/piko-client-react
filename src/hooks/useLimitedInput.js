import React, { useState } from "react"
import useInputValidation from "./validation/useInputValidation.js"

const useLimitiedInput = (initialValue, maxLen, validations) => {
    const [value, setValue] = useState(initialValue)
    const valid = useInputValidation(value, validations)

    const onChange = e => {
        setValue(e.target.value.slice(0, maxLen))
    }

    const toInitState = () => {
        setValue("")
    }

    return {
        value,
        onChange,
        maxLen,
        toInitState,
        ...valid
    }
}

export default useLimitiedInput