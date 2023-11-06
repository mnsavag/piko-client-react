import React from "react"

const SystemMessages = ({messages, style}) => {
    messages = Object.values(messages)

    return (
        <p className={style}>
            {messages.filter((text) => text).join("\n")}
        </p>
    )
}

export default SystemMessages