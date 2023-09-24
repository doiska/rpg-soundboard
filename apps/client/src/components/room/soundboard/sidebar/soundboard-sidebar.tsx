"use client";

import { CategorySelector } from "@/components/room/soundboard/sidebar/category-selector";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryItem } from "@/components/room/soundboard/sidebar/category-item";
import { useState } from "react";
import { useAudioPlayer } from "@/hooks/context/sounds/use-audio-player";

interface Song {
  id: number;
  title: string;
  category: string;
  url: string;
}

export function SoundboardSidebar() {
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const { tracks, addTrack } = useAudioPlayer();

  const fetchCategory = async (category: string) => {
    const response = await fetch(`/api/sounds`).then(
      (res) => res.json() as Promise<Song[]>,
    );

    const filtered = category
      ? response.filter((sound) => sound.category === category)
      : response;

    setCurrentCategory(category);

    filtered.slice(0, 10).forEach((sound) => {
      addTrack({
        id: sound.id,
        title: sound.title,
        url: sound.url,
        category: sound.category,
        artist: "Unknown",
      });
    });
  };

  return (
    <>
      <Separator />
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-tight">Categories</h3>
        <CategorySelector
          categories={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Music",
              value: "music",
            },
            {
              label: "Sound Effects",
              value: "sound-effects",
            },
            {
              label: "Memes",
              value: "memes",
            },
            {
              label: "Custom",
              value: "custom",
            },
          ]}
          selectedCategory={currentCategory}
          setSelectedCategory={(category) => fetchCategory(category)}
        />
      </div>
      <Separator />
      <ScrollArea className="flex flex-col items-center h-[500px]">
        {!tracks.length && <p>No sounds found in this category.</p>}
        <div className="flex flex-col gap-2 w-full p-2">
          {tracks.map(({ info }) => (
            <CategoryItem key={info.id} info={info} value={info.id} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
