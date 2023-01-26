import axios from "axios"

const configs = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const getAccessTokenGithub = async (code) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/github/accessToken?code=${code}`, configs)
    return data
}

export const getUserDataGithub = async (accessToken) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/github/userData?accessToken=${accessToken}`, configs)
    return data
}


export const getStarredReposGithub = async (accessToken, login) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/github/starred-repos?accessToken=${accessToken}&login=${login}`, configs);
    return data
}