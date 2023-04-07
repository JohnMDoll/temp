import { Route, Routes } from "react-router-dom"
import { getHoods } from "./components/managers/hoods_manager";
import { getMurals } from "./components/managers/murals_manager";
import { getSavedMurals } from "./components/managers/savedmurals_manager";
// import { Authorized } from "./views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"


export const Murals = () => {
	return (
      <div>
      </div>
      //All the different pages we want to route to go here ->
    // <Routes>
    //   {/* <Route path="/" element={<Landing />} />
    //   <Route path="/home" element={<Landing />} />
    //   <Route path="/register" element={<Register />} /> */}
    //   <Route
    //     path="*"
    //     element={
    //       // <Authorized>
    //         <>
    //           {/* <ApplicationViews /> */}
    //         </>
    //       // </Authorized>
    //     }
    //   />
    // </Routes>
  );
}
