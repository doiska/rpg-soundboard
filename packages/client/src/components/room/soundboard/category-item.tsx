import { Button } from "@/components/ui/button";

interface CategoryItemProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  label: string;
  onClick: () => void;
}

export function CategoryItem({ label, value, onClick }: CategoryItemProps) {
  return (
    <Button className="p-8" variant="outline" value={value} onClick={onClick}>
      {label}
    </Button>
  );
}
