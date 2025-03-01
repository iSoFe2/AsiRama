import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function SectionHeader({ title, showViewAll = true, onViewAll }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
      </div>
      
      {showViewAll && (
        <Button 
          variant="light" 
          color="primary" 
          size="sm"
          endContent={<Icon icon="lucide:arrow-left" />}
          onPress={onViewAll}
        >
          عرض الكل
        </Button>
      )}
    </div>
  );
}