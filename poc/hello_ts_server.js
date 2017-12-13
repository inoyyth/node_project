"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
http.createServer((request, response) => {
    //create connection
    let client = yield mongodb.connect('mongodb://localhost:27017/nodejs_demo');
    console.log(client);
    //insert data
    let result = yield client.collection('test').insert({ name: "ihdi" });
    //get
    let name = yield client.collection('test').find({}).toArray();
    let status_code = 200;
    let body_response = 'Hello, this is REA type script server';
    let demo_response = ["data 1", "data 2"];
    response.writeHead(status_code);
    response.write(body_response);
    response.end();
}).listen(8081);
console.log('listening to port 8081');
