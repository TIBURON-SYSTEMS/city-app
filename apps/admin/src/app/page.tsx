import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth0 } from "@/lib/auth0";
import { Info, Lock, LogIn, UserPlus } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();

  if (session) {
    const roles = (session.user.tiburonroles as string[]) || [];

    if (roles.includes("brand")) {
      redirect("/brandDashboard");
    }

    if (roles.includes("admin")) {
      redirect("/dashboard");
    }
    redirect("/unauthorized");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome to Admin Dashboard
            </CardTitle>
            <CardDescription className="text-base">
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button asChild className="w-full" size="lg">
                <a href="/auth/login">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in
                </a>
              </Button>

              <Button asChild className="w-full" size="lg" variant="outline">
                <a href="/auth/login?screen_hint=signup">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create account
                </a>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure authentication
                </span>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                You will be redirected to Auth0 for secure authentication. After
                signing in, you&apos;ll be returned to the dashboard.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 text-center text-sm">
            <p className="text-muted-foreground">
              Having trouble?
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
              >
                Contact support
              </a>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
}
