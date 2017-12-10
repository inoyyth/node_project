"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
http.createServer(function (request, response) {
    //create connection
    var client = yield mongodb.connect('mongodb://localhost:27017/nodejs_demo');
    console.log(client);
    //insert data
    var status_code = 200;
    var body_response = 'Hello, this is REA type script server';
    var demo_response = ["data 1", "data 2"];
    response.writeHead(status_code);
    response.write(body_response);
    response.end();
}).listen(8081);
console.log('listening to port 8081');
