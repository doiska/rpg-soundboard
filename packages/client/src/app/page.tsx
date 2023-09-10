'use client'
import {useEffect, useRef, useState} from "react";
import {useSocketSender} from "@/lib/socket/useSocketListener";
import {useRoom} from "@/lib/socket/rooms/useRoom";

export default function Room() {
    const currentRoom = useRoom('room1');
    const socket = useSocketSender();

    const [songs, setSongs] = useState<string[]>([]);

    const [tracks, setTracks] = useState<HTMLAudioElement[]>([]);

    useEffect(() => {
        socket.on('list-songs-response', (songs: string[]) => {
            setSongs(songs);
        });

        socket.on('song-control-set-playback', (action: string, _url: string, data: any) => {
            const url = `http://localhost:3001/sounds/${_url}`;

            if (action === 'play') {
                const audio = new Audio(url);
                audio.play();

                setTracks(curr => [...curr, audio]);
            }

            if (action === 'stop') {
                const audio = tracks.find(track => track.src === url);

                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.remove();
                }
            }

            if (action === 'seek') {
                const audio = tracks.find(track => track.src === url);

                if (audio) {
                    audio.currentTime = data;
                }
            }
        });

        socket.emit('list-songs');

        return () => {
            socket.off('list-songs-response');
        }
    }, []);

    return (
        <div className="grid place-items-center h-screen w-screen">
            {
                songs.map((song, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 border-2 p-4">
                        <h1>{song}</h1>
                        <div className="flex gap-6">
                            <button
                                onClick={() => {
                                    socket.emit('song-control-playback', currentRoom, 'play', song);
                                }}
                            >
                                play
                            </button>
                            <button
                                onClick={() => {
                                    socket.emit('song-control-playback', currentRoom, 'stop', song);
                                }}
                            >
                                stop
                            </button>
                            <button
                                onClick={() => {
                                    socket.emit('song-control-playback', currentRoom, 'seek', song, 10);
                                }}
                            >
                                seek
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
