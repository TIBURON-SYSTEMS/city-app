import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { ChallengesContent } from "@/components/dashboard/challenges-content";
import { getChallenges } from "./actions";

export default async function ChallengesPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  } else {
    const roles = (session.user.tiburonroles as string[]) || [];
    if (!roles.includes("admin")) {
      redirect("/unauthorized");
    }
  }

  const challenges = await getChallenges();

  return <ChallengesContent initialChallenges={challenges} />;
}
