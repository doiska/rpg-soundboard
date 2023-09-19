"use client";

import { CategorySelector } from "@/components/room/soundboard/category-selector";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryItem } from "@/components/room/soundboard/category-item";
import { useState } from "react";

const sounds = {
  music: [
    {
      name: "The Beatles - Hey Jude",
    },
    {
      name: "The Beatles - Let It Be",
    },
    {
      name: "The Beatles - Yesterday",
    },
  ],
  "sound-effects": [
    {
      name: "Air Horn",
    },
    {
      name: "Buzzer",
    },
    {
      name: "Clapping",
    },
    {
      name: "Crickets",
    },
  ],
  memes: [
    {
      name: "Bruh",
    },
  ],
  custom: [],
} as const;

export function SoundboardSidebar() {
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const activeSounds =
    sounds[currentCategory as keyof typeof sounds] || sounds.music;

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
          setSelectedCategory={(category) => {
            setCurrentCategory(category);
          }}
        />
      </div>
      <Separator />
      <ScrollArea className="min-w-24">
        {!activeSounds.length && <p>No sounds found in this category.</p>}
        <div className="grid grid-cols-2 gap-2 w-full">
          {activeSounds.map((sound) => (
            <CategoryItem
              key={sound.name}
              label={sound.name}
              onClick={() => {}}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
