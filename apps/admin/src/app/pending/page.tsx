import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PendingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-whit text-5xl font-semibold">
      You account is awaiting admin approval
      <Button className="mt-9 text-2xl" variant={"link"}>
        <Link href="/"> Go back to main page</Link>
      </Button>
    </div>
  );
}
