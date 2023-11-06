import React, { useEffect, useState } from "react"

const Button = ({id, children, ...props}) => {
    return (
        <button id={id} {...props}>
            {children}
        </button>
    )
}

export default Button