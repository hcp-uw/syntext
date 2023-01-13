const App = () => {
  return (
    <div>
      <h1 style={textstyles} fontSize="25">Synte&gt;&lt;t</h1>
      <Menu text={textstyles}/>
      <div className="rectangle" />
    </div>
  );
}



const Menu = (props) => {
  return (
    <>
      <h1 style={props.text}>meow</h1>
    </>
  )
}
export default App;