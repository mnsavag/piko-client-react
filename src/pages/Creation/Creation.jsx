import React, { useState, useRef } from "react"
import NavBar from "../../components/UI/Navbar/Navbar.jsx"
import Input from "../../components/UI/Input/Input.jsx"
import Textarea from "../../components/UI/Textarea/Textarea.jsx"
import ButtonList from "../../components/UI/ButtonList/ButtonList.jsx"
import TitleAndLimit from "../../components/UI/TitleAndLimit/TitleAndLimit.jsx"
import ImageUploader from "../../components/UI/ImageUploader/ImageUploader.jsx"
import SystemMessages from "../../components/SystemMessages.jsx"
import ContestCreationGrid from "../../components/ContestCreationGrid/ContestCreationGrid.jsx"

import pageStyle from "./Creation.module.css"

import useLimitiedInput from "../../hooks/useLimitedInput.js"
import useButtonList from "../../hooks/useButtonList.js"
import { useImage } from "../../hooks/useImage.js"

import { resetCards, setMaxCards, getValidationCardError } from "../../store/creationCards/creationCards.slice.js"
import { useDispatch, useSelector } from "react-redux"

import ContestService from "../../http/contestAPI.js"

import { amountButtons, categoryButtons, accessImageFormat } from "./consts.js"

const Creation = () => {
    const title = useLimitiedInput("", 25, {isEmpty: true, maxLength: 25})
    const description = useLimitiedInput("", 250, {isEmpty: true, maxLength: 250})

    const variantBtns = useButtonList(amountButtons, 1)
    const categoryBtns = useButtonList(categoryButtons, 2, {minSelect: 1, maxSelect: 2})
    
    const previewFirst = useImage(null, {isEmpty: true, format: accessImageFormat})
    const previewSecond = useImage(null, {isEmpty: true, format: accessImageFormat})

    const maxCards = useSelector(state => state.creationCards.maxCards)
    const cards = useSelector(state => state.creationCards.cards)
    const dispatch = useDispatch()

    const showError = useRef(false)
    const showSendSuccess = useRef(false)
    const [rerender, callRerender] = useState(false)

    const variantBtnsHandler = (event) => {
        variantBtns.onClick(event)
        const amountVariants = parseInt(variantBtns.getSelected()[0].title)
        dispatch(setMaxCards(amountVariants))
    }
    
    const publishHandler = async (event) => {
        event.preventDefault()
        
        await validate()
        if (!showError.current) {
            await prepareDataThenPost()
        }
        rerender ? callRerender(false) : callRerender(true)
    }
    
    const validate = async () => {
        const titleError = errorExist(title.textErrors)
        const descriptionError = errorExist(description.textErrors)
        const previewFirstError = errorExist(previewFirst.textErrors)
        const previewSecondError = errorExist(previewSecond.textErrors)
        const tagError = errorExist(categoryBtns.textErrors)
        const cardsError = getValidationCardError(cards, maxCards)
   
        if (titleError || descriptionError || 
            previewFirstError || previewSecondError ||
            tagError || cardsError) {

            showError.current = true
        }
        else {
            showError.current = false
        }
    }

    const errorExist = (obj) => {
        obj.textErrors == {} ? false : true
    }

    const prepareDataThenPost = async () => {
        const tagList = categoryBtns.getSelected().map((tag) => tag.id)
        let cardsForSend = []
        for (const card of cards) {
            cardsForSend.push({name: card.name, image: card.image})
        }
        await makePostRequest(previewFirst.value, previewSecond.value, tagList, cardsForSend)
    }

    const makePostRequest = async (previewFirst, previewSecond, tagList, cardsForSend) => {
        try {
            const responseCreate = await ContestService.create({
                name: title.value,
                description: description.value,
                categoriesIds: tagList,
                options: cardsForSend.map((card) => { return { name: card.name } })
            })
            await ContestService.uploadImages(
                responseCreate.data.id,
                previewFirst,
                previewSecond,
                cardsForSend.map((card) => card.image)
            )
            showSendSuccess.current = true
            resetFields()
        } catch (error) {
            showSendSuccess.current = false
            console.log(error)
            alert(error.response.data.message)
        }
    }

    const resetFields = () => {
        title.toInitState()
        description.toInitState()
        previewFirst.onChange(null)
        previewSecond.onChange(null)
        dispatch(resetCards())
    }

    return (
        <div>
            <NavBar/>
            <div className={pageStyle.container}>
                <div className={pageStyle.wrapper}>
                    <div className={pageStyle.settings}>
                        <div className={`${pageStyle.item} ${pageStyle.itemForm}`}>
                            <TitleAndLimit 
                                title={"Title:"} 
                                value={title.value.length} 
                                maxValue={title.maxLen} 
                            />
                           <Input value={title.value} onChange={title.onChange}/>
                        </div>
                        
                        <div className={`${pageStyle.item} ${pageStyle.itemForm}`}>
                            <TitleAndLimit 
                                title={"Description:"} 
                                value={description.value.length} 
                                maxValue={description.maxLen} 
                            />
                           <Textarea value={description.value} onChange={description.onChange}/>
                        </div>

                        <div className={pageStyle.item}>
                            <p className={pageStyle.marginBottom}>Cover Illustration:</p>

                            <div className={pageStyle.itemPreview}>
                                <div className={pageStyle.uploadWrapper}>
                                    <ImageUploader
                                        styles={pageStyle.previewImg}
                                        callback={previewFirst.onChange}
                                    />
                                </div>
                                <div className={pageStyle.uploadWrapper}>
                                    <ImageUploader
                                        styles={pageStyle.previewImg}
                                        callback={previewSecond.onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className={pageStyle.item}>
                            <TitleAndLimit 
                                title={"Tags:"} 
                                value={categoryBtns.countSelected} 
                                maxValue={categoryBtns.maxSelected} 
                            />
                            <ButtonList
                                list={categoryBtns.buttons}
                                onClick={categoryBtns.onClick}
                                isGridView={true}
                            />
                        </div>

                        <div className={pageStyle.item}>
                            <p className={pageStyle.marginBottom}>Maximum Options:</p>
                            <ButtonList 
                                list={variantBtns.buttons} 
                                onClick={variantBtnsHandler}
                                isListView={true}
                            />
                        </div>
                        
                        <div className={pageStyle.item}>
                            <TitleAndLimit 
                                title={"All Images:"} 
                                value={cards.length} 
                                maxValue={maxCards} 
                            />
                            <ContestCreationGrid />
                        </div>
                        
                        <div className={pageStyle.itemError}>
                            {showError.current && <SystemMessages messages={title.textErrors} style={pageStyle.red}/>}
                            {showError.current && <SystemMessages messages={description.textErrors} style={pageStyle.red}/>}
                            {showError.current && <SystemMessages messages={previewFirst.textErrors} style={pageStyle.red}/>}
                            {showError.current && <SystemMessages messages={previewSecond.textErrors} style={pageStyle.red}/>}
                            {showError.current && <SystemMessages messages={categoryBtns.textErrors} style={pageStyle.red}/>}
                            {showError.current && <SystemMessages messages={[getValidationCardError(cards, maxCards)]} style={pageStyle.red}/>}
                            {showSendSuccess.current && <SystemMessages messages={["Data Sent Successfully"]} style={pageStyle.green} />}
                        </div>

                        <button 
                            className={pageStyle.publishBtn}
                            onClick={async (event) => await publishHandler(event)}
                        >
                            publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Creation
