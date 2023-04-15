import pfp from "./pfpicon.png";
import stylesheet from './Icon'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const IconNavBar = () => {
    return(
      <>
        <Link to="/test"><img className="icon" src={pfp} style={{stylesheet}}></img></Link>
      </>
    )
  }

  export default IconNavBar;