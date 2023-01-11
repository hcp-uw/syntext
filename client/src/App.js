import { useState, useEffect} from "react" 
import x from './services/examplecode'

const Display = (props) => {

  return (
    <div>
      {props.lines.map((line, i) => <p>{line}</p>)}
    </div>
  )
} 


const App = () => {
  const [display, setDisplay] = useState([])

  useEffect(() => {
    x.getEx('medium')
      .then(r => {
        setDisplay(r.data)
      })
  }, [])

  return (
    <div>
      <p>we are all done with set up!</p>
      <Display lines={display}/>
    </div>
  );
}

export default App;