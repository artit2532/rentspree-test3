const db = require('../services/db');

module.exports = {
  search: async function (req, res) {
    await db.ready;

    let result = db.search(req.query.stem || null);
    if (!result.length) return res.status(404).end();

    res.send(result);
  }
}