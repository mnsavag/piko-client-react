import React from "react"
import {Routes, Route } from "react-router-dom"

import Home from "./pages/Home/Home.jsx"
import Creation from "./pages/Creation/Creation.jsx"
import Contest from "./pages/Contest/Contest.jsx"
import Rating from "./pages/Rating/Rating.jsx"
import EmptyTest from "./pages/EmptyTest/EmptyTest.jsx"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/creation" element={<Creation/> }/>
            <Route path="/contest/:id" element={<Contest/> }/>
            <Route path="/contest/rating/:id" element={<Rating/>}/>
            <Route path="/contest/empty/" element={<EmptyTest/>}/>
        </Routes>
    )
}

export default AppRouter
