import React from "react"
import {Link} from "react-router-dom"
import "./landing.css"

const Landing = () => {
    return(
        <div className="landing-page">
            <h1>Welcome to Pick a Park</h1>
            <h3>The simplest source of pertinent information on National Parks in your area</h3>
            <Link id="link-to-home" to="/home">START</Link>
        </div>
    )
}

export default Landing