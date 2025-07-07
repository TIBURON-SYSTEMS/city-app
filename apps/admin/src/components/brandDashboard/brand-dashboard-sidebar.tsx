import { Home, Target, ListIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import BrandNavHeader from "./brand-nav-header";
import { BrandNavUser } from "./brand-nav-user";
import { auth0 } from "@/lib/auth0";
import { notFound, redirect } from "next/navigation";

import prisma from "../../../prisma/db";
import { UserWithBrand } from "@/app/types/brand-dashboard";

const items = [
  {
    title: "Dashboard",
    url: "/brand-dashboard",
    icon: Home,
  },
  {
    title: "Add a challenge",
    url: "/brand-dashboard/add",
    icon: Target,
  },
  {
    title: "List all challenges",
    url: "/brand-dashboard/challenges",
    icon: ListIcon,
  },
];

export async function BrandDashBoardSideBar() {
  const session = await auth0.getSession();
  if (!session?.user) {
    redirect("/auth/login");
  }

  const userInDb: UserWithBrand | null = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      brand: true,
    },
  });

  if (!userInDb) return notFound();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b-1 h-16">
        <BrandNavHeader user={userInDb} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <BrandNavUser user={userInDb} />
      </SidebarFooter>
    </Sidebar>
  );
}
