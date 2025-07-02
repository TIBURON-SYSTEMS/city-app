import { DashBoardSideBar } from "@/components/brandDashboard/brand-dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashBoardSideBar />
      <main className="min-h-screen w-screen">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
