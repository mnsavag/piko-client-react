import React from "react"
import style from "./Cards.module.css"
import Card from "../UI/Card/Card.jsx"
 
const Cards = ({cards}) => {
    return (
        <section className={style.sectionCards}>
            {cards.map((card) => {
                return <Card
                            key={card.id}
                            id={card.id}
                            info={card.description}
                            name={card.name}
                            previewFirst={card.previewFirst}
                            previewSecond={card.previewSecond}
                        />
                }
            )}
        </section>
    )
}


export default Cards