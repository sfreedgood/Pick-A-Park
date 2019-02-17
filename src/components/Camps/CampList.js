import React from "react"

const CampList = (props) => {
    let allCamps;
    //creates a list of all the campgrounds in the selected park
    const yesCamps = () => {
        allCamps = props.camps.map((camp, key) => {
            return(
                <div key={key} className="park">
                    <h2>{camp.name}</h2>
                    <p>{camp.description}</p>
                    <h4>Total Camp Sites: {camp.campsites.totalSites}</h4>
                    <span className="weather">
                        <p><strong>Weather:</strong> {camp.weatherOverview}</p>
                    </span>
                </div>
            )
        })
        return allCamps
    }

    const noCamps = () => {
        return(
            <h3>Apologies, we don't have campground info for that location at this time</h3>
        )
    }
    
    return(
        <div>
            {props.camps && props.camps.length? [ yesCamps() ] : noCamps()}
        </div>
    )
}

export default CampList