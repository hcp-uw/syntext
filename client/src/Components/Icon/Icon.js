import pfp from "./pfpicon.png";
import stylesheet from './Icon'

const IconNavBar = (props) => {
  const { setSettingsFocus } = props;
    return(
      <img className="icon" src={pfp} style={{stylesheet}} onClick={() => setSettingsFocus(true)}/>
    )
  }

  export default IconNavBar;