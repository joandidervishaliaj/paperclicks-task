import { useNavigate } from "react-router-dom"
import { Card, Spacer, Button, Text } from "@nextui-org/react"
import IconGitHub from "../assets/icons/Github"
import { useEffect } from "react";
import { routes } from "../constants/routes";


const Login = () => {
    const ACCESS_TOKEN = "accessToken";
    const USER_DATA = "userData";

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const userDataGithub = JSON.parse(localStorage.getItem(USER_DATA));

    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken && userDataGithub) {
            navigate(routes.APP + routes.HOME);
        }
    }, [accessToken, navigate, userDataGithub])

    const loginToGithub = () => {
        window.location.assign(`${process.env.REACT_APP_GITHUB_AUTH_URL}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: "100vh", width: "100%" }}>
            <Card css={{ mw: "420px", p: "20px" }}>
                <Text
                    size={24}
                    weight='bold'
                    css={{
                        as: "center",
                        mb: "20px",
                    }}
                >
                    Login with
                </Text>
                <Spacer y={1} />
                <Button color='gradient' auto onPress={() => loginToGithub()}>
                    <IconGitHub />
                    <Spacer x={0.5} />
                    GitHub
                </Button>
                <Spacer y={1} />
            </Card>
        </div>
    )
}

export default Login