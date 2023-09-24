"use client";

import { useAudioPlayer } from "@/hooks/context/sounds/use-audio-player";

export default function RoomPage() {
  const { tracks, stopTrack } = useAudioPlayer();

  const playingOnly = tracks.filter(({ state }) => state && state?.playing);

  return (
    <>
      <h1>Room</h1>
      <ul className="grid grid-cols-4 gap-2">
        {playingOnly.map(({ info, state }) => (
          <li
            className="flex flex-col items-center border-2 border-primary"
            key={info.id}
          >
            {info.title} - {state.playing ? "Playing" : "Paused"}
            {state.playing && (
              <button onClick={() => stopTrack(info.id)}>Stop</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
