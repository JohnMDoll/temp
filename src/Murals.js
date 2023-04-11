import { Route, Routes } from "react-router-dom"
import { Home_Carousel } from "./components/home/hood_carousel";
// import { Authorized } from "./views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar";
import { Home } from "./components/home/home";


export const Murals = () => {
	return ( <>
      <NavBar></NavBar>
      {/* <div>
        {Home_Carousel()}
      </div> */}
      {/* //All the different pages we want to route to go here -> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
    {/* <Route path="/register" element={<Register />} /> */}
      <Route
        path="*"
        element={
          // <Authorized>
            <>
              {/* <ApplicationViews /> */}
            </>
          // </Authorized>
        }
        />
    </Routes>
    
        </>
  );
}
