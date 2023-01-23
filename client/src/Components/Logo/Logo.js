const textstyles = {
  color: "white",
  fontSize: "12",
  fontFamily: "Roboto Mono",
}

const Logo = () => {
    return(
      <div>
        <span><h1 style={textstyles} fontSize="25" onClick={handleClick}>Synte&gt;&lt;t</h1></span>
        <div className="rectangle" />
      </div>
    )
  }

  function handleClick() {
    window.location.assign('/');
  }

  // function Logo() {
  //   return (
  //     <span onClick={handleClick}>
  //       Synte&gt;&lt;t
  //     </span>
  //   )
  // }

export default Logo;