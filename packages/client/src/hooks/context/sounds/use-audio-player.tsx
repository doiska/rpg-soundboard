"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type TrackInfo = {
  id: number;
  url: string;
  artist: string;
  category: string;
  title: string;
};

type TrackState = {
  playing: boolean;
  ended: boolean;
  position: number;
};

type AudioPlayerContextType = {
  tracks: { info: TrackInfo; raw: HTMLAudioElement; state: TrackState }[];
  addTrack: (track: TrackInfo) => number;
  playTrack: (trackId: number) => void;
  stopTrack: (trackId: number) => void;
  isTrackPlaying: (trackId: number) => boolean;
  removeTrack: (trackId: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tracks, setTracks] = useState<
    { info: TrackInfo; raw: HTMLAudioElement; state: TrackState }[]
  >([]);

  useEffect(() => {
    // Clean up when a track finishes playing
    const cleanup = () => {
      setTracks((prevTracks) => prevTracks.filter(({ state }) => !state.ended));
    };

    // Add event listener to each audio element
    tracks.forEach(({ raw }) => {
      raw.addEventListener("ended", cleanup);
    });

    // Remove event listeners when component unmounts
    return () => {
      tracks.forEach(({ raw }) => {
        raw.removeEventListener("ended", cleanup);
      });
    };
  }, [tracks]);

  const playTrack = (trackId: number) => {
    setTracks((prevTracks) => {
      return prevTracks.map((track) => {
        if (track.info.id === trackId) {
          const { raw, state } = track;
          raw.play();
          return { ...track, state: { ...state, playing: true } };
        }
        return track;
      });
    });
  };

  const stopTrack = (trackId: number) => {
    setTracks((prevTracks) => {
      return prevTracks.map((track) => {
        if (track.info.id === trackId) {
          const { raw, state } = track;
          raw.pause();
          raw.currentTime = 0;
          return { ...track, state: { ...state, playing: false } };
        }
        return track;
      });
    });
  };

  const isTrackPlaying = (trackId: number) => {
    const track = tracks.find(({ info }) => info.id === trackId);
    return track ? track.state.playing : false;
  };

  const removeTrack = (trackId: number) => {
    setTracks((prevTracks) =>
      prevTracks.filter(({ info }) => info.id !== trackId),
    );
  };

  const addTrack = (track: TrackInfo) => {
    const raw = new Audio(track.url);

    setTracks((prevTracks) => [
      ...prevTracks,
      {
        raw,
        info: track,
        state: { playing: false, ended: false, position: 0 },
      },
    ]);
    return tracks.length; // Return the ID (index) of the newly added track
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        tracks,
        playTrack,
        stopTrack,
        isTrackPlaying,
        removeTrack,
        addTrack,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
}
