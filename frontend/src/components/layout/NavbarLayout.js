import { useNavigate } from "react-router-dom"
import { Button, Navbar, User } from "@nextui-org/react"
import LogOutIcon from "../../assets/icons/Logout"
import { routes } from "../../constants/routes";

const NavbarLayout = () => {
   const ACCESS_TOKEN = "accessToken";
   const USER_DATA = "userData";

   const userDataGithub = JSON.parse(localStorage.getItem(USER_DATA));

   const navigate = useNavigate();

   const setLogOut = () => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER_DATA);
      navigate(routes.LOGIN);
   }

   return (
      <Navbar isBordered variant='sticky'>
         <Navbar.Brand>
            <User
               bordered
               color='primary'
               size='lg'
               src={userDataGithub?.avatar_url}
               name={userDataGithub?.login}
               description={userDataGithub?.bio}
            />
         </Navbar.Brand>
         <Navbar.Content>
            <Navbar.Item>
               <Button
                  auto
                  flat
                  size='sm'
                  icon={<LogOutIcon fill='currentColor' />}
                  color='primary'
                  onPress={() => setLogOut()}
               >
                  Log out
               </Button>
            </Navbar.Item>
         </Navbar.Content>
      </Navbar>
   )
}

export default NavbarLayout;