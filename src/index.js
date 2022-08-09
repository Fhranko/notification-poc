// import express from 'express';
// import { Server as WebSocketserver } from 'socket.io';
// import http from 'http';
// import { v4 as uuid } from 'uuid';

const express = require('express');
const { Server: WebSocketserver } = require('socket.io');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
	console.log('console');
	res.send('hola mundo');
});

const server = http.createServer(app);
const io = new WebSocketserver(server);
// const notes = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	console.log('new connection: ', socket.id);

	socket.on('client:newNote', (newNote) => {
		// notes.push({ ...newNote, id: uuid() });
		socket.emit('server:newNote');
	});
});

server.listen(3000);
console.log('Server on port', 3000);
