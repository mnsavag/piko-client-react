import React, { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetching } from "../../hooks/useFetching.js"

import Loader from "../../components/UI/Loader/Loader.jsx"
import VariantWrapper from "../../components/VariantWrapper/VariantWrapper.jsx"

import ContestService from "../../http/contestAPI.js"

import pageStyle from "./Contest.module.css"

import { shuffle } from "../../utils/arrayUtils.js"
import { getBackgroundImageRemoteURL } from "../../utils/url.js"


const variants = Object.freeze({
    none: 0,
    first: 1,
    second: 2
})

const stateUser = Object.freeze({
    selection: 0,
    selected: 1
})

const Contest = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [isTransition, setIsTransition] = useState(false) // don't show 1 stage twice
    const [userState, setUserState] = useState(stateUser.selection)
    const [selectedVariant, setSelectedVariant] = useState(variants.none)
    const selectedVariants = useRef([])

    const [contest, setContest] = useState({})
    const [contestGrid, setContestGrid] = useState({})
    const [pairNumber, setPairNumber] = useState(0)
    
    const stage = useRef(0)

    const [fetchContestById, isLoading, error] = useFetching(async () => {
        try {
            const response = await ContestService.getById(params.id)
            response.data.options = shuffle(response.data.options)
            setContest(response.data)
            setContestGrid(response.data.options)
        } catch (error) {
            navigate("/contest/empty")
        }
    })
    
    useEffect(() => {
        fetchContestById(params.id)
    }, [])

    useEffect(() => {
        if (userState === stateUser.selection && 
            selectedVariant === variants.none) {
                setIsTransition(false)
            }
    }, [pairNumber])
    
    useEffect(() => {
        selectedVariants.current = []
    }, [contestGrid])
    
    const selectionHandler = (e, idSelected, value) => {
        e.preventDefault()
        switch(userState) {
            case stateUser.selection:
                setUserState(stateUser.selected)
                setSelectedVariant(idSelected)
                selectedVariants.current.push(value)
                break;
            case stateUser.selected:
                const isFinal = contestGrid.length === 2
                const isFinalPair = stage.current + 2 === contestGrid.length
                if (isFinal) {
                    postWinAndRedirect(value)
                    break
                }
                if (isFinalPair){
                    makeNewRound()
                    break
                }
                getNextPair()
                break;
            default:
                break;
          }
    }
    
    const getNextPair = () => {
        setIsTransition(true)
        setUserState(stateUser.selection)
        setSelectedVariant(variants.none)
        setPairNumber(pairNumber + 2)
        stage.current += 2
    }

    const makeNewRound = () => {
        setIsTransition(true)
        setUserState(stateUser.selection)
        setSelectedVariant(variants.none)
        setContestGrid(selectedVariants.current)
        setPairNumber(0)
        stage.current = 0
    }

    const postWinAndRedirect = async (winOption) => {
        try {
            await ContestService.updateVictory(params.id, winOption.id)
            navigate(`/contest/rating/${params.id}`)
        } catch (e) {
            alert(e.message)
        }
    }


    if (isLoading || !(pairNumber in contestGrid)) {
        return (
            <div className={pageStyle.loaderWrapper}>
                <Loader/>
            </div>
        )
    }
    else return (
        <div className={pageStyle.contest}>
            <div className={pageStyle.info}>
                { contestGrid.length === 2
                    ? <p>{contest.name} {contest.options.length} Final </p>
                    : <p>{contest.name} {contest.options.length} {stage.current}/{contestGrid.length} </p>
                }
            </div>
           
            <div className={`${pageStyle.headers} ${pageStyle.header}`}>
                <div className={`${pageStyle.header} ${pageStyle.firstVar}`}>
                    <p>{contestGrid[pairNumber].name}</p>
                </div>
                <div className={`${pageStyle.header} ${pageStyle.secondVar}`}>
                    <p>{contestGrid[pairNumber + 1].name}</p>
                </div>
            </div>

            <VariantWrapper
                id={1} 
                selectedId={selectedVariant} 
                userState={userState}
                style={pageStyle.firstStyle}
                selectedStyle={pageStyle.selectedStyle}
                onClick={(e) => selectionHandler(e, 1, contestGrid[pairNumber])}
            >
                {!isTransition &&
                    <div 
                        className={pageStyle.image} 
                        style={{ backgroundImage: getBackgroundImageRemoteURL(contestGrid[pairNumber].image) }}
                    />
                }
            </VariantWrapper>

            <VariantWrapper
                id={2} 
                selectedId={selectedVariant} 
                userState={userState}
                style={pageStyle.secondStyle}
                selectedStyle={pageStyle.selectedStyle}
                onClick={(e) => selectionHandler(e, 2, contestGrid[pairNumber + 1])}
            >
                {!isTransition &&
                    <div 
                        className={pageStyle.image} 
                        style={{ backgroundImage: getBackgroundImageRemoteURL(contestGrid[pairNumber + 1].image) }}
                    />
                }
            </VariantWrapper>
        </div>
    )
}

export default Contest