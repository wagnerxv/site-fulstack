"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

import { NavUser } from "./nav-user";

export default function SideBarDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:hidden">
          <div className="flex flex-row items-center gap-2 px-4 justify-between w-full ">
            <SidebarTrigger className="-ml-1" />
            <NavUser className="w-fit" />
          </div>
        </header>
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2  border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
