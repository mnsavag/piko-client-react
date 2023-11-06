import React, { useState, useEffect, useMemo } from "react";
import Loader from "../../components/UI/Loader/Loader.jsx";
import NavBar from "../../components/UI/Navbar/Navbar.jsx";
import SearchForm from "../../components/UI/SearchForm/SearchForm.jsx";
import ButtonList from "../../components/UI/ButtonList/ButtonList.jsx";
import Cards from "../../components/Cards/Cards.jsx"

import useButtonList from "../../hooks/useButtonList.js";
import { useFetching } from "../../hooks/useFetching.js";

import ContestService from "../../http/contestAPI.js";

import homeStyle from "./Home.module.css"

import { sortButtons } from "./consts.js";


function Home() {
    const [cards, setCards] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSort, setSelectedSort] = useState()

    const buttonList = useButtonList(sortButtons, 1)

    const [fetchCards, isLoading, cardError] = useFetching(async () => {
        const response = await ContestService.getAll(searchQuery)
        setCards(response.data) 
    })
    useEffect(() => {
        fetchCards()
    }, [])

    let sortedCards = useMemo(() => {
        if (selectedSort) {
            return [...cards].sort((a, b) => selectedSort.sortFunc(
                                                                    new Date(a[selectedSort.sortField]), 
                                                                    new Date(b[selectedSort.sortField])
                                                                ))
        }
        return cards
    }, [selectedSort, cards])

    const sortCards = (btn) => {
        setSelectedSort({sortField: btn.sortField, sortFunc: btn.sortFunc})
    }

    const buttonListHandler = (event) => {
        buttonList.onClick(event)
        sortCards(buttonList.getSelected()[0])
    }

    const searchFormCallback = (event) => {
        event.preventDefault()
        fetchCards()
    }

    const inputHandler = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div>
            <NavBar/>
            <br/>
            <div className={homeStyle.container}>
                <section className={homeStyle.filtration}>
                    <ButtonList
                        list={buttonList.buttons}
                        isListView={true}
                        onClick={buttonListHandler}
                    />
                    <SearchForm
                        formStyle={homeStyle.searchForm}
                        buttonTitle={"Search"}
                        inputValue={searchQuery}
                        onChange={inputHandler}
                        callback={searchFormCallback}
                    />
                </section>
                {isLoading 
                    ? <div className={homeStyle.loaderWrapper}>
                        <Loader/>
                      </div>
                    : 
                    <div className={homeStyle.gridWrapper}>
                        <Cards cards={sortedCards}/>
                    </div>
                }
            </div>
        </div>
  );
}

export default Home;
