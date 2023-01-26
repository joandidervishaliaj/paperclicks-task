import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAccessTokenGithub, getUserDataGithub } from "../services/GithubService";
import { routes } from "../constants/routes";

const PreAuth = () => {
   const ACCESS_TOKEN = "accessToken";
   const USER_DATA = "userData";

   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const codeParam = urlParams.get("code");
   const accessToken = localStorage.getItem(ACCESS_TOKEN);

   const navigate = useNavigate();

   useEffect(() => {
      if (!codeParam) {
         navigate(routes.LOGIN);
      }
      if (codeParam && !accessToken) {
         getAccessTokenGithub(codeParam).then(resp => {
            localStorage.setItem(ACCESS_TOKEN, resp.access_token);
            getUserDataGithub(resp.access_token)
            .then((data) => {
               localStorage.setItem(USER_DATA, JSON.stringify(data));
               navigate(routes.APP + routes.HOME);
            });
         })
      } else if (codeParam && accessToken) {
         getUserDataGithub(accessToken)
         .then((data) => {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(USER_DATA, JSON.stringify(data));
            navigate(routes.HOME);
         });
      }
   }, [accessToken, codeParam, navigate]);

   return (
      <></>
   )
}

export default PreAuth;