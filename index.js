require('isomorphic-fetch');
require('now-env');

const { parse } = require('url');
const { send } = require('micro');

module.exports = async (req, res) => {
  const { query } = parse(req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const requestUrl = `http://api.barcodelookup.com/v2/products?key=${process.env.API_KEY}&barcode=${query}`;
  fetch(requestUrl)
    .then(response => response.text())
    .then(data => {
      send(res, 200, data);
    })
    .catch(error => {
      send(res, 500, error);
    });
};
