import React, { Component } from 'react';
import { Route, Link } from "react-router-dom"
import Home from "./components/Home.js"
import CampList from "./components/Camps/CampList"
import Landing from "./components/Landing"
import axios from "axios"
import './App.css';

const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY
const URLbase = 'https://developer.nps.gov/api/v1/'
const URLend = `&api_key=${NPS_API_KEY}`

class App extends Component {
  constructor(){
    super()
    this.state = {
      parks: [],
      camps: null,
      selectedOption: null,
      currentPage: null,
      homeButtonClass: "current-btn",
      campButtonClass: "other-btn"
    }
  }

  //Gets US State to search
  handleChange = (selectedOption) => {
    const state = selectedOption.value
    this.setState({selectedOption: selectedOption.value})
    this.loadData(state)
  }

  //Exectutes API call to get all park info for above State
  //Saves all park data in state
  loadData = async (state) => {
    const resp = await axios(URLbase + 'parks?stateCode=' + state + URLend)
    const parkList = resp.data.data
    this.setState({
      stateCode: state,
      parks: parkList
    })
  }

  //Gets the api's Park-Code from the selected (clicked) park
  parkSelect = (e) =>{
    const parkCode = e.currentTarget.id
    this.setState((prevState)=>({
      parks: prevState.parks,
      stateCode: prevState.stateCode,
      currentParkCode: parkCode
    }))
    this.getCamps(parkCode)
  }

  //Executes search using the above Park-Code to get campground info for that park
  //Saves resulting list of camps in state
  getCamps = async (parkCode) =>{
    const resp = await axios(URLbase + 'campgrounds?parkCode=' + parkCode + URLend)
    const camps = resp.data.data
    camps ?
    (this.setState((prevState) => ({
      parks: prevState.parks,
      stateCode: prevState.stateCode,
      currentParkCode: parkCode,
      camps: camps
    }))) : 
    (this.setState((prevState) => ({
      parks: prevState.parks,
      stateCode: prevState.stateCode,
      currentParkCode: parkCode,
      camps: null
    })))
  }

  //Changes navigation button styling
  toggleButton = (e) => {
    let currentPage = e.target.href
    if (currentPage !== this.state.currentPage) {
      this.setState(prevState => ({
        currentPage,
        homeButtonClass: prevState.campButtonClass,
        campButtonClass: prevState.homeButtonClass
      }))
    }
  }

  render() {
    const {selectedOption} = this.state
    return (
      <div className="App">
        <nav className="nav">
          <Link id="homeBtn" className={this.state.homeButtonClass} onClick={this.toggleButton} to="/home">Home</Link>
          <Link id="campsBtn" className={this.state.campButtonClass} onClick={this.toggleButton} to="/camps"> Campgrounds</Link>
        </nav>
        <main>
          <Route exact path="/" render={Landing}></Route>
          <Route path="/camps" render={() =>
            (<CampList camps={this.state.camps}/>)} >
          </Route>
          <Route path="/home" render={() => 
            (<Home selectedOption={selectedOption} 
                   parks={this.state.parks}
                   parkSelect={this.parkSelect}
                   handleChange={this.handleChange}
                   toggleButton={this.toggleButton}/>)}>
          </Route>
        </main>
      </div>
    );
  }
}

export default App;
