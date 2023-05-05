import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar";


export const Murals = () => {
	return ( <>

					<NavBar />
						<img className="background-picture" src="../../media/Pink_Simple_Neon_Phrase_Instagram_Story.png"></img>

					<ApplicationViews />
    
        </>
  )
}
