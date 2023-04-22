import pfp from "./pfpicon.png";
import stylesheet from './Icon'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const IconNavBar = (props) => {
  const { setSettingsFocus } = props;
    return(
      <img className="icon" src={pfp} style={{stylesheet}} onClick={setSettingsFocus(true)}></img>
    )
  }

  export default IconNavBar;