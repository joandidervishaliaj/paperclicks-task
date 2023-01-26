const { StatusCode } = require('status-code-enum');
const axios = require('axios');
const { syncUser, syncUserRepos } = require('./sync_service');

async function getAccessToken(req, res) {
	try {
		const code = req.query.code;
		const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

		axios
			.post(
				`${process.env.GITHUB_URL}/login/oauth/access_token${params}`,
				{},
				{
					headers: {
						Accept: 'application/json',
					},
				},
			)
			.then((response) => {
				res.status(StatusCode.SuccessOK).json(response.data);
			})
			.catch((error) => {
				console.log(error);
				res.status(StatusCode.ServerErrorInternal).json({ message: "Failed to get access token from github!" });
			});
	} catch (error) {
		console.error(error);
		res.status(StatusCode.ServerErrorInternal).json({ message: "Internal server error!" });
	}
}

async function getUserData(req, res) {
	try {
		const accessToken = req.query.accessToken;

		axios
			.get(`${process.env.GITHUB_API_URL}/user`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				syncUser(response.data.name, response.data.login, response.data.avatar_url, response.data.email);
				res.status(StatusCode.SuccessOK).json(response.data);
			})
			.catch((error) => {
				console.log(error);
				res.status(StatusCode.ServerErrorInternal).json({ message: "Failed to fetch user data from github!" });
			});
	} catch (error) {
		console.error(error);
		res.status(StatusCode.ServerErrorInternal).json({ message: "Internal server error!" });
	}
}

async function getStarredRepos(req, res) {
	try {
		const accessToken = req.query.accessToken;
		const login = req.query.login;

		axios
			.get(`${process.env.GITHUB_API_URL}/users/${login}/starred`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				syncUserRepos(response.data);
				res.status(StatusCode.SuccessOK).json(response.data);
			})
			.catch((error) => {
				console.log(error);
				res.status(StatusCode.ServerErrorInternal).json({ message: "Failed to fetch starred repos from github!" });
			});
	} catch (error) {
		console.error(error);
		res.status(StatusCode.ServerErrorInternal).json({ message: "Internal server error!" });
	}
}

module.exports = {
	getAccessToken,
	getUserData,
	getStarredRepos
}
