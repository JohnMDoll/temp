import { Route, Routes } from "react-router-dom"
// import { Authorized } from "./views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar";


export const Murals = () => {
  return (
    <>
      <NavBar />
    </>
    //All the different pages we want to route to go here ->
    // <Routes>
    //   {/* <Route path="/" element={<Landing />} />
    //   <Route path="/home" element={<Landing />} />
    //   <Route path="/register" element={<Register />} /> */}
    //   <Route
    //     path="*"
    //     element={
    // <Authorized>
    //         <>
    //           {/* <ApplicationViews /> */}
    //         </>
    //       // </Authorized>
    //     }
    //   />
    // </Routes>
  );
}
