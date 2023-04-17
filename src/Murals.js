import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar";


export const Murals = () => {
	return ( <>

					<NavBar />
					<ApplicationViews />
    
        </>
  )
}
