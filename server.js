//Install express server
const cors = require('cors'); 
const express = require('express');
const path = require('path');

const app = express();

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/covidIndiaStat-website'));

app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname + '/dist/covidIndiaStat-website/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);