import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import AccountInfo from "./Pages/AccountInfo";

const App = () => {
	return(
		// Any other pages we plan to add will go here
		<Routes>
			<Route path="/" element={<Main/>}/>
			<Route path="/account" element={<AccountInfo/>}/>
		</Routes>
	)
}

export default App;