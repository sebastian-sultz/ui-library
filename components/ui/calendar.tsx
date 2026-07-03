"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import { DayPicker, useDayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarYearRangeContext = React.createContext({
  fromYear: 1800,
  toYear: 2200,
});

function CalendarMonthCaption({
  calendarMonth,
}: {
  calendarMonth: { date: Date };
  displayIndex: number;
}) {
  const { goToMonth } = useDayPicker();
  const { fromYear, toYear } = React.useContext(CalendarYearRangeContext);

  const month = calendarMonth.date.getMonth();
  const year = calendarMonth.date.getFullYear();

  const monthOptions = MONTH_NAMES.map((name, i) => ({
    value: i.toString(),
    label: name,
  }));

  const yearOptions = Array.from(
    { length: toYear - fromYear + 1 },
    (_, i) => ({
      value: (fromYear + i).toString(),
      label: String(fromYear + i),
    })
  );

  return (
    <div className="flex items-center h-10 border-b border-text-tertiary/30 pb-3 mb-2">
      <div className="flex items-center gap-2">
        <Select
          value={month.toString()}
          onValueChange={(val) => goToMonth(new Date(year, parseInt(val), 1))}
        >
          <SelectTrigger className="w-fit border-none bg-transparent p-0 shadow-none hover:bg-transparent hover:cursor-pointer focus:ring-0 [&>svg]:hidden text-sm font-semibold text-main-primary data-[state=open]:text-main-primary h-auto min-h-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="start"
            className={cn(
              "max-h-[220px] bg-white text-text-primary rounded-lg shadow-primary border-none",
              "no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {monthOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "hover:bg-background-primary focus:bg-background-primary cursor-pointer",
                  "data-[state=checked]:bg-background-secondary data-[state=checked]:text-main-primary data-[state=checked]:font-semibold",
                  "[&_span[data-slot=select-item-indicator]]:hidden pl-3 pr-3"
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={year.toString()}
          onValueChange={(val) => goToMonth(new Date(parseInt(val), month, 1))}
        >
          <SelectTrigger className="w-fit border-none bg-transparent p-0 shadow-none hover:bg-transparent hover:cursor-pointer focus:ring-0 gap-0.5 text-sm font-bold text-text-primary data-[state=open]:text-text-primary h-auto min-h-0 [&>svg]:size-3.5 [&>svg]:text-text-secondary [&>svg]:opacity-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="start"
            className={cn(
              "max-h-[220px] bg-white text-text-primary rounded-lg shadow-primary border-none",
              "no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {yearOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "hover:bg-background-primary focus:bg-background-primary cursor-pointer",
                  "data-[state=checked]:bg-background-secondary data-[state=checked]:text-main-primary data-[state=checked]:font-semibold",
                  "[&_span[data-slot=select-item-indicator]]:hidden pl-3 pr-3"
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function Calendar({
  className,
  showOutsideDays = true,
  startMonth,
  endMonth,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const currentYear = new Date().getFullYear();
  const fromYear = startMonth?.getFullYear() ?? 1800;
  const toYear = endMonth?.getFullYear() ?? 2200;

  const yearRange = React.useMemo(
    () => ({ fromYear, toYear }),
    [fromYear, toYear]
  );

  return (
    <CalendarYearRangeContext.Provider value={yearRange}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        startMonth={startMonth ?? new Date(fromYear, 0)}
        endMonth={endMonth ?? new Date(toYear, 11)}
        className={cn("p-4", className)}
        classNames={{
          months: "flex flex-col",
          month: "relative flex flex-col",
          month_caption: "",
          nav: "absolute right-4 top-5 flex items-center gap-1 z-10",
          button_previous: cn(
            "inline-flex items-center justify-center",
            "h-5 w-5 p-0 rounded-full",
            "text-main-primary hover:bg-background-primary hover:text-processing-main",
            "transition-colors cursor-pointer",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          ),
          button_next: cn(
            "inline-flex items-center justify-center",
            "h-5 w-5 p-0 rounded-full",
            "text-main-primary hover:bg-background-primary hover:text-processing-main",
            "transition-colors cursor-pointer",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          ),
          month_grid: "w-full border-collapse mt-1",
          weekdays: "flex",
          weekday:
            "w-10 py-2 text-center text-[13px] font-semibold text-text-secondary select-none",
          week: "flex w-full mt-1",
          day: "h-10 w-10 text-center text-sm p-0 relative",
          day_button: cn(
            "inline-flex items-center justify-center",
            "h-9 w-9 rounded-full p-0 font-medium cursor-pointer",
            "text-text-primary",
            "hover:bg-background-primary hover:text-main-primary",
            "focus-visible:outline-none",
            "transition-colors",
            "aria-selected:opacity-100"
          ),
          selected: cn(
            "[&>button]:!bg-main-primary [&>button]:!text-white [&>button]:!ring-0",
            "[&>button]:hover:!bg-processing-main [&>button]:hover:!text-white"
          ),
          today: cn(
            "[&>button]:ring-1 [&>button]:ring-main-primary",
            "[&>button]:text-main-primary [&>button]:font-semibold"
          ),
          outside:
            "text-text-tertiary [&>button]:text-text-tertiary [&>button]:hover:text-text-secondary",
          disabled:
            "text-text-tertiary opacity-50 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent",
          hidden: "invisible",
        }}
        components={{
          MonthCaption: CalendarMonthCaption,
          Chevron: ({ orientation, ...chevronProps }) => {
            if (orientation === "left") {
              return (
                <ChevronLeftIcon
                  className="h-4 w-4 pointer-events-none"
                  {...chevronProps}
                />
              );
            }
            if (orientation === "right") {
              return (
                <ChevronRightIcon
                  className="h-4 w-4 pointer-events-none"
                  {...chevronProps}
                />
              );
            }
            return (
              <ChevronDownIcon
                className="h-3.5 w-3.5"
                {...chevronProps}
              />
            );
          },
        }}
        {...props}
      />
    </CalendarYearRangeContext.Provider>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
