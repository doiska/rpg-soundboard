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
    audioNode: AudioBufferSourceNode;
    state: TrackState;
  }[];
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
  const [context] = useState(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new (window.AudioContext || window.webkitAudioContext)(),
  );

  const [tracks, setTracks] = useState<
    { info: TrackInfo; audioNode: AudioBufferSourceNode; state: TrackState }[]
  >([]);

  useEffect(() => {
    return () => {
      context.close(); // Close the audio context when the component unmounts
    };
  }, [context]);

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
          const { audioNode, state } = track;
          audioNode.stop();
          audioNode.disconnect(); // Disconnect the audio node
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
    context.resume(); // Ensure audio context is resumed to play audio on mobile devices
    fetch(track.url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        context.decodeAudioData(buffer, (audioBuffer) => {
          const audioNode = context.createBufferSource();
          audioNode.buffer = audioBuffer;
          audioNode.connect(context.destination); // Connect audio node to output
          audioNode.onended = () => {
            // Remove track when it finishes playing
            removeTrack(track.id);
          };
          const state = { playing: false, position: 0 };
          setTracks((prevTracks) => [
            ...prevTracks,
            {
              audioNode,
              info: track,
              state,
            },
          ]);
          return audioNode;
        });
      });

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
