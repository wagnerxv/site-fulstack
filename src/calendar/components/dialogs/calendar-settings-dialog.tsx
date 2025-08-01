"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

import { ChangeBadgeVariantInput } from "../change-badge-variant-input";
import { ChangeVisibleHoursInput } from "../change-visible-hours-input";
import { ChangeWorkingHoursInput } from "../change-working-hours-input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CalendarSettingsDialogProps {
  children?: React.ReactNode;
}

export function CalendarSettingsDialog({
  children,
}: CalendarSettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children || (
          <button className="flex items-center gap-2 text-sm font-medium hover:text-primary ml-auto">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:block">Configurações do Calendário</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 p-0 w-[95vw] max-w-[500px] sm:max-h-[min(640px,80vh)] ">
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="flex items-center gap-2 px-6 pt-6">
              <Settings className="h-5 w-5" />
              Configurações do Calendário
            </DialogTitle>
            <DialogDescription asChild>
              <div className="px-6 pb-2">
                <p className="text-sm text-muted-foreground">
                  Customize a aparência e comportamento do seu calendário.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 px-6 pb-6">
            <ChangeBadgeVariantInput />
            <ChangeVisibleHoursInput />
            <ChangeWorkingHoursInput />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
