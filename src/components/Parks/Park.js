import React from "react"
import { Link } from "react-router-dom"
import "./park.css"

const Park = (props) => {
    //Creates a list of Parks with info populated
    //Each Park is a Link in order navigate to Camp info on click
    const parkList = props.parks.map((el, key) => {
        return(
            <Link to="/camps"
                 className="park"
                 id={el.parkCode}
                 onMouseOver={props.parkSelect}
                 key={key}>
                <h3>{el.fullName}</h3>
                <p>{el.description}</p>
            </Link>
        )
    })

    return(
        <div className="all-parks">
            {parkList}
        </div>
    )
}

export default Park