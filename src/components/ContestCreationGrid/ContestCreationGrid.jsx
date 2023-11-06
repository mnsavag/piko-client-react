import React, { useEffect } from "react"
import styles from "./ContestCreationGrid.module.css"

import { useDispatch, useSelector } from "react-redux"
import { addCard, addCreationCard, removeCard, removeExtraCards, setNameById } from "../../store/creationCards/creationCards.slice.js"

import CardCreation from "../UI/CardCreation/CardCreation.jsx"


const ContestCreationGrid = () => {
    const maxCards = useSelector(state => state.creationCards.maxCards)
    const cards = useSelector(state => state.creationCards.cards)
    const maxNameLen = useSelector(state => state.creationCards.maxNameLen)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addCreationCard())
    }, [cards])

    useEffect(() => {
        dispatch(removeExtraCards())
    }, [maxCards])
    
    const onImageUploaded = (image) => {
        dispatch(addCard({
            id: cards.length, 
            name: image.name, 
            image: image.file, 
            imageURL: image.url
        }))
    }

    const setCardName = (index, string) => {
        dispatch(setNameById({
            index: index, 
            name: string
        }))
    }

    const btnDeleteHandler = (event) => {
        event.preventDefault()
        dispatch(removeCard(parseInt(event.target.id)))
    }

    return (
        <div className={styles.gridVariants}>
            {cards.map((card, index) => {
                return (
                   <CardCreation
                        key={card.id}

                        id={card.id}
                        index={index}
                        name={card.name}
                        maxNameLen={maxNameLen}
                        imageURL={card.imageURL}

                        imageUploaderCallback={onImageUploaded}
                        deleteHandler={btnDeleteHandler} 
                        inputHandler={setCardName}
                   />
                )
            })
        }
        </div>
    )
}

export default ContestCreationGrid