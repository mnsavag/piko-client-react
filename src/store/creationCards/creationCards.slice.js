import { createSlice } from "@reduxjs/toolkit"


/* Циклические зависимости? Не могу положить в reducer. */
export const getValidationCardError = (cards, maxCards) => {
    if (cards.length !== maxCards) {
        return `The number of cards must equal ${maxCards}`
    }
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].name) {
            return `The option ${i + 1} must have a name`
        }
        if (!cards[i].imageURL) {
            return `The option ${i + 1} must have an image`
        }
    }
    return ""
}

const getIndexById = (id, list) => {
    return list.findIndex((card) => card.id === id)
}

const reassignId = (list) => {
    for (let i = 0; i < list.length; i++) {
        list[i] = ({...list[i], id: i + 1})
    }
    return list
}


export const creationCardsSlice = createSlice({
    name: "creationCards",
    initialState: {
        maxCards: 8,
        maxNameLen: 25,
        cards: [{id: 1, name: "", image: {}, imageURL: ""}]
    },
    reducers: {
        addCard(state, action) {
            if (state.cards.length <= state.maxCards) {
                const index = getIndexById(action.payload.id, state.cards)
                action.payload.name = action.payload.name.slice(0, state.maxNameLen)
                state.cards[index] = action.payload
            }
        },

        addCreationCard(state) {
            const nullParams = {name: "", image: null, imageURL: ""}
            if (!state.cards.length) {
                state.cards.push({id: 1, ...nullParams}) 
            }
            else if (state.cards.at(-1).imageURL && state.cards.length < state.maxCards) {
                state.cards.push({id: state.cards.length + 1, ...nullParams})
            }
        },

        removeCard(state, action) {
            let filteredList = state.cards.filter((card) => card.id !== action.payload)
            state.cards = reassignId(filteredList)
        },

        removeExtraCards(state) {
            state.cards = state.cards.slice(0, state.maxCards)
        },

        setNameById(state, action) {
            const index = action.payload.index
            state.cards = [
                            ...state.cards.slice(0, index), 
                            {...state.cards[index], name: action.payload.name.slice(0, state.maxNameLen)}, 
                            ...state.cards.slice(index + 1)
                        ]
        },

        setMaxCards(state, action) {
            state.maxCards = action.payload
        },

        resetCards(state, action) {
            state.cards = [{id: 1, name: "", image: {}, imageURL: ""}]
        },
    }
})

export default creationCardsSlice.reducer
export const {  addCard, addCreationCard, removeCard, removeExtraCards, resetCards, setNameById, setMaxCards } = creationCardsSlice.actions
