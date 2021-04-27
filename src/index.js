const server = require('./api/server.js')

const port = process.env.PORT || 3000;

//separate the listen from the server so it can test properly

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
