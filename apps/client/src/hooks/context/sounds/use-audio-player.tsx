"use client"

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
  position: number;
};

type AudioPlayerContextType = {
  tracks: {
    info: TrackInfo;
    context: AudioContext;
    audioNode: AudioBufferSourceNode;
    state: TrackState;
  }[];
  addTrack: (track: TrackInfo) => void;
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

  const [tracks, setTracks] =
      useState<AudioPlayerContextType['tracks'][number][]>([]);


  const playTrack = (trackId: number) => {
    setTracks((prevTracks) => {
      return prevTracks.map((track) => {
        if (track.info.id === trackId) {
          const { audioNode, state } = track;
          audioNode.start();
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

          const { audioNode, state, context } = track;
          audioNode.stop();
          audioNode.disconnect();
          context.close();

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
    fetch(track.url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const context = new AudioContext();
        context.decodeAudioData(buffer, (audioBuffer) => {
          const audioNode = context.createBufferSource();
          audioNode.buffer = audioBuffer;
          audioNode.connect(context.destination); // Connect audio node to output
          audioNode.onended = () => {
            removeTrack(track.id);
          };
          const state = { playing: false, position: 0 };

          setTracks((prevTracks) => [
            ...prevTracks,
            {
              audioNode,
              info: track,
                context,
              state,
            },
          ]);
          return audioNode;
        });
      });

    return tracks.length;
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
