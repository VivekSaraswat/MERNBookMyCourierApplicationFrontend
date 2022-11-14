import React from "react"
import NavBarUser from "../../common/navbar/navbaruser/NavBarUser"
import { Outlet } from "react-router-dom"


const AdminLayout = () => {
    return(
        <>
        <NavBarUser />
        <Outlet />  
        </>
    )
}

export default AdminLayout; 