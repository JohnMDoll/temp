import { Route, Routes } from "react-router-dom"
import { Home } from "../home/home";
import { Hood, HoodsList } from "../hood/Hoods";
import { MuralsList } from "../mural/muralsList";



export const ApplicationViews = () => {


	return <>
		<Routes>
			{/* <Route path="/home" element={<Homepage />} /> */}
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home/>} />
			<Route path="/hood" element={<HoodsList/>} />
			<Route path="/murals" element={<MuralsList/>} />

	</Routes>
	</>
}
