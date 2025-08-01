"use client";

import * as React from "react";

import {
  // IconSettings,
  IconChartBarPopular,
  IconUsers,
  IconCalendarWeekFilled,
} from "@tabler/icons-react";

// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  //   SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { ModeToggle } from "./change-theme";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Agendamentos",
      url: "/dashboard",
      icon: IconCalendarWeekFilled,
      isActive: true, // página inicial ativa
    },
    {
      title: "Funcionários",
      url: "/dashboard/employees",
      icon: IconUsers,
    },
    {
      title: "Gestão",
      url: "/dashboard/management",
      icon: IconChartBarPopular,
    },
    // {
    //   title: "Configurações",
    //   url: "/dashboard/settings",
    //   icon: IconSettings,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <SidebarTrigger />
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser className="" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
