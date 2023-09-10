//TODO: https://socket.io/pt-br/docs/v4/typescript/

import {setupFileRouter} from "express-router-fs";
import * as fs from "fs";
import * as path from "path";
import { fastify } from "fastify";
import { default as fastifyIo } from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {env} from "./lib/env.js";

export var __filename = fileURLToPath(import.meta.url);
export var __dirname = dirname(fileURLToPath(import.meta.url));

const app = fastify();

app.register(fastifyIo as never);
app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public')
});

await setupFileRouter(app as never, {
    directory: __dirname + "/routes",
});

app.listen({
    port: Number(env.PORT)
}).then(() => {
    app.io.on('connection', (socket) => {
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
            app.io.to(room).emit('song-control-set-playback', action, data);
        })
    });
})
