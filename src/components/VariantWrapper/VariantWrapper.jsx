import React from "react"
import cl from "./VariantWrapper.module.css"

const stateUser = Object.freeze({
    selection: 0,
    selected: 1
})

const VariantWrapper = ({id, selectedId, userState, selectedStyle,  children, style, ...props}) => {
    const styles = (selectedId === id) ? `${style} ${selectedStyle}` : style

    const doShowVariant = () => {
        if (userState === stateUser.selected && selectedId !== id) {
            return false
        }
        return true
    }
    
    return (
        <div className={`${cl.variant} ${styles}`} {...props}>
            { doShowVariant() && children }   
        </div>
    )
}

export default VariantWrapper