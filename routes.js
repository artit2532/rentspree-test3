const searchController = require('./controllers/search.controller');

module.exports = function (app) {
  app.get('/', searchController.search);
}