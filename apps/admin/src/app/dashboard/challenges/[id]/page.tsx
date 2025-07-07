import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import prisma from "../../../../../prisma/db";
import { Prisma } from "@/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Target,
  Gift,
  Users,
  Package,
  Store,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { AdminActions } from "./admin-actions";

type ChallengeWithFullDetails = Prisma.ChallengeGetPayload<{
  include: {
    brand: {
      include: {
        user: true;
      };
    };
    challengeProducts: {
      include: {
        product: true;
      };
    };
    rewards: true;
    participations: {
      include: {
        participant: {
          include: {
            user: true;
          };
        };
      };
    };
  };
}>;

type Params = Promise<{ id: string }>;

export default async function AdminChallengeDetailsPage(props: {
  params: Params;
}) {
  const params = await props.params;
  const id = params.id;

  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const roles = (session.user.tiburonroles as string[]) || [];
  if (!roles.includes("admin")) {
    redirect("/unauthorized");
  }

  const challenge: ChallengeWithFullDetails | null =
    await prisma.challenge.findUnique({
      where: { id },
      include: {
        brand: {
          include: {
            user: true,
          },
        },
        challengeProducts: {
          include: {
            product: true,
          },
        },
        rewards: true,
        participations: {
          include: {
            participant: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

  if (!challenge) {
    redirect("/dashboard");
  }

  const daysRemaining = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const totalParticipants = challenge.participations.length;
  const totalProgress = challenge.participations.reduce(
    (sum, p) => sum + p.amount,
    0
  );
  const averageProgress =
    totalParticipants > 0 ? Math.round(totalProgress / totalParticipants) : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <header className="bg-background border-b">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Challenge Details
              </h2>
              <p className="text-sm text-muted-foreground">
                Review challenge information for approval
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">{challenge.label}</CardTitle>
                <p className="text-sm text-gray-500">
                  Challenge ID: {challenge.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    challenge.status === "active" ? "default" : "secondary"
                  }
                  className={
                    challenge.status === "active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : ""
                  }
                >
                  {challenge.status === "active" ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {challenge.status}
                </Badge>
                {daysRemaining < 0 ? (
                  <Badge
                    variant="destructive"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    Expired
                  </Badge>
                ) : daysRemaining <= 7 ? (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {daysRemaining} days left
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {daysRemaining} days left
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Description
              </h4>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Goal</p>
                  <p className="text-sm font-medium">{challenge.goal} items</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium">
                    {format(new Date(challenge.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Ends</p>
                  <p className="text-sm font-medium">
                    {format(new Date(challenge.endDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-gray-400" />
              <CardTitle className="text-lg">Brand Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{challenge.brand.name}</p>
                  <p className="text-xs text-gray-500">
                    {challenge.brand.user.email}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    challenge.brand.status === "ACTIVE"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : challenge.brand.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {challenge.brand.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                <p>Brand ID: {challenge.brand.id}</p>
                <p>
                  Joined:{" "}
                  {format(new Date(challenge.brand.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              <CardTitle className="text-lg">
                Products ({challenge.challengeProducts.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {challenge.challengeProducts.map((cp) => (
                <div
                  key={cp.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{cp.product.label}</p>
                      <p className="text-xs text-gray-500">
                        Material: {cp.product.material}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">ID: {cp.product.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-gray-400" />
              <CardTitle className="text-lg">
                Rewards ({challenge.rewards.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {challenge.rewards.length > 0 ? (
              <div className="space-y-2">
                {challenge.rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{reward.label}</p>
                        <p className="text-xs text-gray-500">
                          Value: {reward.amount} points
                        </p>
                      </div>
                      {reward.imageUrl && (
                        <Badge variant="outline" className="text-xs">
                          Has image
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No rewards added yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <CardTitle className="text-lg">
                Participation Statistics
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Total Participants</p>
                <p className="text-2xl font-semibold">{totalParticipants}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Total Progress</p>
                <p className="text-2xl font-semibold">
                  {totalProgress} / {challenge.goal}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Average Progress</p>
                <p className="text-2xl font-semibold">{averageProgress}</p>
              </div>
            </div>

            {totalParticipants > 0 && (
              <div>
                <h5 className="text-sm font-medium mb-2">
                  Recent Participants
                </h5>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {challenge.participations.slice(0, 5).map((participation) => (
                    <div
                      key={participation.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100"
                    >
                      <div className="text-sm">
                        <p className="font-medium">
                          {participation.participant.user.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Progress: {participation.amount} items
                        </p>
                      </div>
                      <p className="text-xs text-gray-400">
                        {format(
                          new Date(participation.createdAt),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </div>
                  ))}
                  {totalParticipants > 5 && (
                    <p className="text-xs text-gray-500 text-center pt-2">
                      And {totalParticipants - 5} more participants...
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminActions
              challengeId={challenge.id}
              challengeStatus={challenge.status}
              brandId={challenge.brand.id}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
