import { combineReducers, configureStore } from "@reduxjs/toolkit"
import creationCardsSlice from "./creationCards/creationCards.slice"

const rootReducer = combineReducers({
    creationCards: creationCardsSlice
})

export const store = configureStore({
    reducer: rootReducer
})