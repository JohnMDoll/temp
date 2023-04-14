import { Route, Routes } from "react-router-dom"
import { Home } from "../home/home";
import { Hood } from "../hood/Hoods";



export const ApplicationViews = () => {


	return <>
		<Routes>
			{/* <Route path="/home" element={<Homepage />} /> */}
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home/>} />
			<Route path="/hood" element={<Hood/>} />

	</Routes>
	</>
}
