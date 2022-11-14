import React from "react";
import NavBarUser from "../../common/navbar/navbaruser/NavBarUser";
import { Outlet } from "react-router-dom";

const DeliveryPersonLayout = () => {
  return (
    <>
      <NavBarUser />
      <Outlet />
    </>
  );
};

export default DeliveryPersonLayout;
