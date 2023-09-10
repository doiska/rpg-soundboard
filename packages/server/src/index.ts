import express from "express";
import {Server} from 'socket.io';
import {setupFileRouter} from "express-router-fs";
import http from 'http';
import {env} from "./lib/env";
import * as fs from "fs";
import * as path from "path";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

setupFileRouter(app as never, {
    directory: __dirname + "/routes",
}).then(() => {
    console.log("[File Router] All routes loaded!");
});

io.on('connection', (socket) => {
    socket.on('connect-room', (room: string) => {
        console.log(`Connected to room ${room}`);
        socket.join(room);
    });

    socket.on('disconnect-room', (room: string) => {
        console.log(`Disconnected from room ${room}`);
        socket.leave(room);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected!');
    });

    //TODO: use fetch instead of socket to list the songs
    socket.on('list-songs', (room: string) => {
        const files = fs.readdirSync('./public/sounds', {
            recursive: true,
            withFileTypes: true
        }).filter(file => file.isFile() && file.name.split('.').pop() === 'mp3').map(file => file.name);

        socket.emit('list-songs-response', files);
    });

    socket.on('song-control-playback', (room: string, action: string, data: any) => {
        io.to(room).emit('song-control-set-playback', action, data);
    })
});

server.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
});

console.log(path.join(__dirname, '..', 'public'))

app.use(express.static('public'));