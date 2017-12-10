const http = require('http');

http.createServer((request, response) =>{
  request.test();
  response.writeHead(200);
  response.write("Hello, this is REA Server");
  response.end();
}).listen(8081);

console.log('listening to port 8081');
