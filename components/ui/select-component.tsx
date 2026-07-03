import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

type selectProps = {
  options: Array<{ value: string; label: string }>;
  defaultValue: string;
  trigger: string;
  onValueChange: (value: string) => void;
  className?: string;
};

function SelectComponent({
  options,
  defaultValue,
  trigger,
  className,
  onValueChange,
}: selectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "border-text-tertiary shadow-none text-text-primary data-placeholder:text-text-tertiary px-4 py-5 focus-visible:ring-0",
          className,
        )}
      >
        <SelectValue placeholder={trigger} />
      </SelectTrigger>
      <SelectContent
        side="bottom"
        align="start"
        position="popper"
        className={cn(
          "text-main-primary border-none shadow-lg bg-white",
          className,
        )}
      >
        <SelectGroup>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectComponent };
