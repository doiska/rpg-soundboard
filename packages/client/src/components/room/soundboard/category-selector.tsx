import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySelectorProps extends React.ComponentPropsWithoutRef<"div"> {
  categories: {
    label: string;
    value?: string;
  }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function CategorySelector({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant="outline" role="combobox" aria-expanded="true">
          {categories.find((category) => category.value === selectedCategory)
            ?.label ?? "Select a category"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search for a category" />
          <CommandEmpty>No category found</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.value}
                onSelect={() => {
                  setSelectedCategory(category.value ?? "");
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    category.value === selectedCategory
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {category.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
