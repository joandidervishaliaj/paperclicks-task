import { Outlet } from "react-router-dom"
import NavbarLayout from "./NavbarLayout";

const AuthLayout = () => {

   return (
      <div style={{ minHeight: "100vh", width: "100%" }}>
         <NavbarLayout />
         <Outlet />
      </div>
   )
}

export default AuthLayout;