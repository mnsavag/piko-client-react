import React from "react"
import Button from "../Button/Button.jsx"

import styleGrid from "./ButtonsGridView.module.css"
import styleBtn from "../Button/Button.module.css"

const ButtonList = ({list, onClick, isListView, isGridView}) => {
    let style = null
    if (isListView) {
        style = styleBtn
    }
    else if (isGridView) {
        style = styleGrid
    }

    return (
        <div className={isListView ? {display: "flex"} : 
                        style.wrapper}
        >
            {
                list.map((btn) => 
                    <Button
                        key={btn.id}
                        id={btn.id} 
                        className={`${
                                    btn.selected ? [style.button, style.selected].join(" ") 
                                    : style.button
                                }`}
                        title={btn.title}
                        onClick={onClick}
                    > 
                        {btn.title}
                    </Button>)
            }
        </div>
    )
}

export default ButtonList
