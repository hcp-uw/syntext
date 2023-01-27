import styles from "./Logo.css";
//import React, { useState } from 'react';


const textstyles = {
  color: "white",
  fontSize: "12",
  fontFamily: "Roboto Mono",
}


const Logo = () => {
    return(
      <div className="hoverable">
        <span><h1 style={textstyles} fontSize="25" onClick={handleClick}>Synte&gt;&lt;t</h1></span>
      </div>
      //onMouseOver={changedText} onMouseLeave={normalText}
    )
  }

  function handleClick() {
    window.location.assign('/');
  }

 
  // function normalText() {
  //   this.setState({text : "Syntext"}) 
  // } 
  // function changedText() {
  //   this.setState({text : "Synte- -t"}) 
  // } 


export default Logo;