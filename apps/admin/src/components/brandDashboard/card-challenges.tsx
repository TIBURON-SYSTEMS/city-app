"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, ListIcon, UserRoundPlus } from "lucide-react";
import BrandCardLayout from "./brand-card-layout";
import { Prisma } from "@/generated/prisma";
import Link from "next/link";

type ChallengeWithParticipants = Prisma.ChallengeGetPayload<{
  include: { participations: true };
}>;

interface ListAllChallengesProps {
  data: ChallengeWithParticipants[];
}

export default function ListAllChallenges({ data }: ListAllChallengesProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <BrandCardLayout
      title="List of all challenges"
      icon={ListIcon}
      description="Browse and manage every challenge you’ve created."
    >
      <div className="w-full max-w-6xl mx-auto space-y-4">
        <div className="space-y-4">
          {data.map((challenge) => (
            <Card
              key={challenge.id}
              className="w-full py-0 border-0 hover:bg-slate-100/30"
            >
              <CardContent className="p-0">
                <div className="flex p-6">
                  <CardHeader className="p-0 w-full">
                    <div className="flex flex-col gap-3 mb-2">
                      <div className="flex gap-3 items-center">
                        <CardTitle className="text-xl font-semibold">
                          {challenge.label}
                        </CardTitle>
                        <Badge
                          variant={
                            challenge.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            challenge.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : ""
                          }
                        >
                          {challenge.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          <span>Goal: {challenge.goal} items</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Challenge ends: {formatDate(challenge.endDate)}
                          </span>
                          <div className="flex items-center gap-2">
                            <UserRoundPlus className="h-4 w-4 text-green-500" />
                            <p className="text-base font-medium text-slate-700">
                              Participants:{" "}
                              <span
                                className={
                                  challenge.participations.length > 0
                                    ? "text-green-500"
                                    : ""
                                }
                              >
                                {challenge.participations.length}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <div className="ml-6">
                    <Button variant="outline">
                      <Link
                        href={`/brand-dashboard/challenges/${challenge.id}`}
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BrandCardLayout>
  );
}
