import { Route, Routes } from "react-router-dom"
import { getHoods } from "./components/managers/hoods_manager";
import { getMurals } from "./components/managers/murals_manager";
import { getSavedMurals } from "./components/managers/savedmurals_manager";
import { Authorized } from "./components/views/Authorized";
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./components/views/ApplicationViews";



export const Murals = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					{/* <NavBar /> */}
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}
