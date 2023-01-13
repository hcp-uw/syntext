const textstyles = {
  color: "white",
  fontSize: "12",
  fontFamily: "Roboto Mono",
}

const Logo = () => {
  return(
    <a><img href="???"/></a>
  )
}

const Iconnavbar = () => {
  return(
    <ul>
      <li><a><img href="???profile logo"/></a></li>
      <li><a><img href="???settings logo"/></a></li>
      <li><a><img href="???leaderboard logo"/></a></li>
    </ul>
  )
}

const App = () => {
  return (
    <div>
      <h1 style={textstyles} fontSize="25">Synte&gt;&lt;t</h1>
      <Menu text={textstyles}/>
      <div className="rectangle" />
    </div>
  );
}



export default App;