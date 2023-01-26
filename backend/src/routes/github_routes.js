const express = require('express');
const router = express.Router();
const githubService = require('../services/github_service');

router.get('/accessToken', githubService.getAccessToken);
router.get('/userData', githubService.getUserData);
router.get('/starred-repos', githubService.getStarredRepos);

module.exports = router;