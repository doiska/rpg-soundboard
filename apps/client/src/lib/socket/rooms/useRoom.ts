import { useState, useEffect } from 'react';
import {useSocketSender} from "@/lib/socket/useSocketListener";

export function useRoom(roomId: string) {
    const sender = useSocketSender();
    const [currentRoom, setCurrentRoom] = useState<string | null>();

    useEffect(() => {
        sender.emit('connect-room', roomId);
        setCurrentRoom(roomId);

        return () => {
            sender.emit('disconnect-room', roomId);
        };
    }, [roomId]);

    return currentRoom;
}