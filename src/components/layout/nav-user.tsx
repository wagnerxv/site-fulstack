"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconDotsVertical } from "@tabler/icons-react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export function NavUser({ className }: { className?: string }) {
  const { isMobile } = useSidebar();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer w-fit sm:w-full p-0 h-fit"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={"/logo.jpg"} alt={session.user.name} />
                <AvatarFallback className="rounded-lg">
                  {session?.user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className=" flex-1 text-left text-sm leading-tight hidden sm:grid">
                <span className="truncate font-medium hidden sm:block">
                  {session.user.name}
                </span>
                <span className="truncate text-xs hidden sm:block">
                  {session.user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4 hidden sm:block" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={"/logo.jpg"} alt={session.user.name} />
                  <AvatarFallback className="rounded-lg">
                    {session?.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() =>
                signOut({ callbackUrl: "/", redirect: true }).then(() =>
                  toast.success("Logout realizado com sucesso!")
                )
              }
              className="cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
