//import * as http from 'http';
import {Db, WriteOpResult, MongoClient} from 'mongodb';
const http = require('http');

http.createServer((request:any, response:any) =>{
    //create connection
    let client:Db = await mongodb.connect('mongodb://localhost:27017/nodejs_demo');
    console.log(client);

    //insert data
    let result:WriteOpResult = await client.collection('test').insert({name: "ihdi"});

    //get
    let name:any = await client.collection('test').find({}).toArray();

    let status_code:number = 200;
    let body_response:string = 'Hello, this is REA type script server';

    let demo_response:Array<string> = ["data 1", "data 2"];

    response.writeHead(status_code);
    response.write(body_response);
    response.end();
}).listen(8081);

console.log('listening to port 8081');
