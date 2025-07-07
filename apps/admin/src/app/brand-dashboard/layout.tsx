import { BrandDashBoardSideBar } from "@/components/brandDashboard/brand-dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiburon - Brand Dashboard",
  description: "Tiburon - Brand Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <BrandDashBoardSideBar />
      <main className="min-h-screen w-screen">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
