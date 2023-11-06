import React, { useState, useEffect } from "react"
import Loader from "../../components/UI/Loader/Loader.jsx"
import NavBar from "../../components/UI/Navbar/Navbar.jsx"
import CardRating from "../../components/UI/CardRating/CardRating.jsx"

import { useFetching } from "../../hooks/useFetching"
import { useParams } from "react-router-dom"

import ContestService from "../../http/contestAPI.js"

import styles from "./Rating.module.css"


const Rating = () => {
    const params = useParams()
    const [cardTierList, setCardTierList] = useState([])
    const [isContestPassed, setIsContestPassed] = useState(false)

    const [fetchCards, isLoading, cardError] = useFetching(async () => {
        const response = await ContestService.getTierList(params.id)

        if (response.data.find((value) => parseInt(value.winRate) != 0)) {
            setIsContestPassed(true)
        }
        setCardTierList(response.data)
    })

    useEffect(() => {
        fetchCards()
    }, [])

    if (isLoading || !cardTierList) {
        return (
            <div className={styles.loaderWrapper}>
                <Loader/>
            </div>
        )
    }
    else if (!isContestPassed) {
        return (
            <div className={styles.notFound}>
                Take this test first
            </div>
        )
    }
    return (
        <div>
            <NavBar/>
            <div className={styles.wrapper}>
                {cardTierList.map((card, index) => {
                    return <CardRating
                                key={card.id}
                                name={card.name}
                                image={card.image}
                                place={index + 1}
                                winRate={card.winRate}
                            />
                    })
                }
            </div>
        </div>
    )
}

export default Rating
