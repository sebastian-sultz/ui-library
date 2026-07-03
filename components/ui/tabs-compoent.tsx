"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsVariant } from "@/components/ui/tabs";
import { TabsTriggerStatus } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
type TabItem = {
  value: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  status?: TabsTriggerStatus;
};

type TabProps = {
  tabs: TabItem[];
  variant?: TabsVariant;
  defaultValue?: string;
  className?: string;
  listClassName?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};
function capitalizeWords(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function TabsComponent({
  tabs,
  variant = "default",
  defaultValue,
  className,
  listClassName,
  value,
  onValueChange,
}: TabProps) {
  const initialValue =
    defaultValue ?? tabs.find((tab) => !tab.disabled)?.value ?? "";
  if (!initialValue) return null;

  const hasTabContent = tabs.some((tab) => tab.content !== undefined);

  return (
    <Tabs
      value={value}
      defaultValue={value ? undefined : initialValue}
      onValueChange={onValueChange}
      variant={variant}
      className={cn(className)}
    >
      <TabsList className={listClassName}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            icon={tab.icon}
            status={tab.status}
          >
            {capitalizeWords(tab.label)}
          </TabsTrigger>
        ))}
      </TabsList>
      {hasTabContent &&
        tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
    </Tabs>
  );
}

export { TabsComponent };
