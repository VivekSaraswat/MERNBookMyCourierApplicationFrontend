import React from "react"
import NavBarHome from "../../common/navbar/navbarhome/NavBarHome"
import { Outlet } from "react-router-dom"


const HomeLayout = () => {
    return(
        <>
        <NavBarHome />
        <Outlet />  
        </>
    )
}

export default HomeLayout; 