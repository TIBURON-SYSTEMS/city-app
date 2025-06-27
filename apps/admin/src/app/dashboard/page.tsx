import { auth0 } from "@/lib/auth0";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default async function DashboardPage() {
  const session = await auth0.getSession();
  
  return <DashboardContent user={session?.user} />;
}
