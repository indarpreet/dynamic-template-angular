const app = require('./config/express')();
const http = require('http');

const port = process.env.PORT || 4200;

const server = http.createServer(app);
server.timeout = 120000;

server.listen(port, () => {
  const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
  console.log(`Express server listening on port ${port}.\nEnvironment: ${env}`);
});


server.on('error', (err) => {console.log(err); });
