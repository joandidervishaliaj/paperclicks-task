const githubRouter = require('./github_routes');

function initializeRoutes(app) {
    app.use('/github', githubRouter);
}

module.exports = {
    initializeRoutes
}