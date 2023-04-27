import { Route, Routes } from "react-router-dom"
import { Home } from "../home/home";
import { Hood, HoodsList } from "../hood/Hoods";
import { MuralsList } from "../mural/muralsList";
import { MuralPage } from "../mural/muralPage";



export const ApplicationViews = () => {


	return <>
		<Routes>
			{/* <Route path="/home" element={<Homepage />} /> */}
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home/>} />
			<Route path="/hood" element={<HoodsList/>} />
			<Route path="/murals" element={<MuralsList/>} />
			<Route path="/murals/:muralId" element={<MuralPage/>} />

	</Routes>
	</>
}
