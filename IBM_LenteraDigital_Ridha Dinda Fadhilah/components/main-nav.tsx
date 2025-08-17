"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  LayoutDashboard,
  MessageSquareHeart,
  SearchX,
  ShieldAlert,
  Trophy,
} from "lucide-react";
import { LenteraLogo } from "@/components/icons";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Dasbor",
    icon: LayoutDashboard,
  },
  {
    href: "/report",
    label: "Lapor Aman",
    icon: ShieldAlert,
  },
  {
    href: "/hub",
    label: "Pusat Literasi",
    icon: BookOpenText,
  },
  {
    href: "/support-chat",
    label: "Chat Bantuan AI",
    icon: MessageSquareHeart,
  },
  {
    href: "/bullying-detection",
    label: "Deteksi Bullying",
    icon: SearchX,
  },
  {
    href: "/rewards",
    label: "Poin & Komunitas",
    icon: Trophy,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-lg"
        >
          <LenteraLogo className="w-8 h-8" />
          <span className="group-data-[collapsible=icon]:hidden">
            Lentera Digital
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={link.label}
                className={cn(
                  "justify-start",
                  pathname === link.href && "bg-primary/20 text-primary-foreground"
                )}
              >
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
