import React, { useState } from "react"
import useMultiSelectValidation from "./validation/useMultiSelectValidation.js"
/* Example of Required fields [{id: 1, title: "8", selected: true}] */

const useButtonList = (initialState, maxSelected, validations) => {
    const [buttons, setButtons] = useState(initialState)
    const [countSelected, setCountSelected] = useState(0)

    const valid = useMultiSelectValidation(countSelected, validations)

    const onClick = e => {
        e.preventDefault()
        const btnClicked = e.target
        if (maxSelected === 1) {
            aloneSelected(btnClicked)
        }
        else {
            manySelected(btnClicked)
        }
    }

    const aloneSelected = btnClicked => {
        let newList = []
        buttons.map((btn) => {
            if (btn.id.toString() !== btnClicked.id.toString()) {
                btn.selected = false 
            }
            else {
                btn.selected = true
            }
            newList.push(btn)
        })
        setButtons(newList)
    }

    const manySelected = btnClicked => {
        let newList = []
        let firstSelected = null
        for (const btn of buttons) {
            if (btn.selected) {
                firstSelected = btn
            }
            newList.push(btn)
        }
    
        for (let btn of newList) {
            if (btn.id.toString() === btnClicked.id.toString()) {
                if (btn.selected) {
                    btn.selected = false
                    setCountSelected(countSelected - 1)
                }
                else if (countSelected < maxSelected){
                    btn.selected = true
                    setCountSelected(countSelected + 1)
                }
                else {
                    firstSelected.selected = false
                    btn.selected = true
                }
            }
        }
        setButtons(newList)
    }

    const getSelected = () => {
        return buttons.filter((btn) => btn.selected === true)
    }

    return {
        buttons,
        onClick,
        countSelected,
        maxSelected,
        getSelected,
        ...valid
    }
}

export default useButtonList