import { Button } from "@/components/ui/button";
import { useAudioPlayer } from "@/hooks/context/sounds/use-audio-player";

interface CategoryItemProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  info: {
    id: number;
    title: string;
    category: string;
    url: string;
  };
}

export function CategoryItem({ info, value }: CategoryItemProps) {
  const { playTrack } = useAudioPlayer();

  return (
    <Button
      className="p-2"
      variant="outline"
      value={value}
      onClick={() => {
        if (!info.url) return;

        playTrack(info.id);
      }}
    >
      {info.title}
    </Button>
  );
}
