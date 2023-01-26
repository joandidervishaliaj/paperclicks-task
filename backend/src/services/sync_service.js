const User = require('../models/user');
const Repo = require('../models/repo');

const options = { 
	upsert: true, 
	new: true, 
	setDefaultsOnInsert: true 
};

async function syncUser(name, login, avatar_url, email) {
	const query = { 
		name, 
		login, 
		avatar_url, 
		email 
	};

	User.findOneAndUpdate(query, {}, options, function(error, response) {});
}

async function syncUserRepos(repos) {
	repos.forEach((repo) => {
		const query = { 
			name: repo.name, 
			url: repo.url, 
			visibility: repo.visibility, 
			user: repo.user 
		};

		Repo.findOneAndUpdate(query, {}, options, function(error, response) {});
	});
}

module.exports = {
	syncUser,
	syncUserRepos
}
