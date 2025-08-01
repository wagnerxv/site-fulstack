"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TablerIcon } from "@tabler/icons-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import LinkLoading from "../link-loading";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: TablerIcon | LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className="cursor-pointer"
                asChild
              >
                <Link href={item.url} className="font-medium flex">
                  {item.icon && <item.icon />}
                  <span>{item.title} </span>
                  <div className="ml-auto">
                    <LinkLoading />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
