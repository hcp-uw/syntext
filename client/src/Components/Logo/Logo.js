import styles from "./Logo.css";
//import React, { useState } from 'react';


const textstyles = {
  color: "black",
  fontSize: "12",
  fontFamily: "Roboto Mono",
}


const Logo = () => {
    return(
      <div className="hoverable">
        <span><h1 style={textstyles} fontSize="25" onClick={handleClick} onMouseEnter={showText()} onMouseLeave={hideText()}>{this.state.text}</h1></span>
      </div>
      //onMouseOver={changedText} onMouseLeave={normalText}
    )
  }

  function showText() {
    this.setState({text : "Synte><t"}) 
  } 
  function hideText() {
    this.setState({text : "Synte- -t"}) 
  } 
  
  function handleClick() {
    window.location.assign('/');
  }


export default Logo;