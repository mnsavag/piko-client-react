import React from "react"
import Input from "../Input/Input.jsx"
import Button from "../Button/Button.jsx"
import style from "../Button/Button.module.css"


const SearchForm = ({formStyle, inputValue, onChange, callback, buttonTitle}) => {
    return (
        <form className={formStyle}>
            <Input
                style={style.borderRightNone}
                value={inputValue}
                onChange={onChange}
                type="text"
            />
            <Button
                className={`${style.button} ${style.selected}`}
                onClick={(e) => callback(e)}
            >
                {buttonTitle}
            </Button>
        </form>
    )
}

export default SearchForm
