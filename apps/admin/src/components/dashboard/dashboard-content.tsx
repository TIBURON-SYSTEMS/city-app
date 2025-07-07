"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckCircle,
  MapPin,
  Zap,
  TrendingUp,
  Package,
  Target,
  Store,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";

interface DashboardContentProps {
  user?: {
    name?: string;
    email: string;
    picture?: string;
  };
  stats: {
    totalUsers: number;
    totalBrands: number;
    totalChallenges: number;
    totalProducts: number;
    itemsRecycled: number;
    totalBins: number;
    totalDisposals: number;
  };
  recentChallenges?: Array<{
    id: string;
    label: string;
    status: string;
    createdAt: Date;
    brand: {
      name: string;
    };
    _count: {
      participations: number;
      rewards: number;
    };
  }>;
}

export function DashboardContent({
  user,
  stats,
  recentChallenges,
}: DashboardContentProps) {
  const co2InKg = stats.itemsRecycled * 0.08;
  const co2Saved =
    co2InKg > 1000
      ? `${(co2InKg / 1000).toFixed(1)}t`
      : `${co2InKg.toFixed(0)}kg`;

  const userGrowth = stats.totalUsers > 100 ? "+12%" : "+8%";
  const recyclingGrowth = stats.itemsRecycled > 10000 ? "+8%" : "+5%";

  const brandProgress = Math.min((stats.totalBrands / 50) * 100, 100);
  const challengeProgress = Math.min((stats.totalChallenges / 100) * 100, 100);
  const productProgress = Math.min((stats.totalProducts / 200) * 100, 100);

  return (
    <>
      <DashboardHeader
        title="Dashboard Overview"
        description="Monitor your recycling network performance"
        user={user}
      />

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Users"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            change={userGrowth}
            changeType="positive"
          />
          <StatsCard
            title="Items Recycled"
            value={stats.itemsRecycled.toLocaleString()}
            icon={CheckCircle}
            change={recyclingGrowth}
            changeType="positive"
          />
          <StatsCard
            title="Collection Points"
            value={stats.totalBins.toString()}
            icon={MapPin}
            change={`+${Math.floor(stats.totalBins / 30)}`}
            changeType="positive"
          />
          <StatsCard
            title="CO2 Saved"
            value={co2Saved}
            icon={Zap}
            change={recyclingGrowth}
            changeType="positive"
          />
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Platform Metrics
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Overview of brands, challenges, and products in the system
                </p>
              </div>
              <Badge variant="outline" className="bg-green-50">
                <ArrowUp className="w-3 h-3 mr-1" />
                Growing
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Store className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Active Brands
                    </p>
                    <p className="text-xs text-gray-500">Target: 50 brands</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalBrands}
                  </p>
                  <p className="text-xs text-green-600 flex items-center justify-end">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +15% this month
                  </p>
                </div>
              </div>
              <Progress value={brandProgress} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Active Challenges
                    </p>
                    <p className="text-xs text-gray-500">
                      Target: 100 challenges
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalChallenges}
                  </p>
                  <p className="text-xs text-green-600 flex items-center justify-end">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +22% this month
                  </p>
                </div>
              </div>
              <Progress value={challengeProgress} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Products Tracked
                    </p>
                    <p className="text-xs text-gray-500">
                      Target: 200 products
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalProducts}
                  </p>
                  <p className="text-xs text-green-600 flex items-center justify-end">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +18% this month
                  </p>
                </div>
              </div>
              <Progress value={productProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Total Disposals
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalDisposals.toLocaleString()}
                  </p>
                  <Progress value={75} className="h-1 mt-2" />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Avg. Items per Disposal
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700"
                    >
                      Stable
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalDisposals > 0
                      ? (stats.itemsRecycled / stats.totalDisposals).toFixed(1)
                      : "0"}
                  </p>
                  <Progress value={60} className="h-1 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Efficiency Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Users per Brand
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-purple-50 text-purple-700"
                    >
                      Growing
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalBrands > 0
                      ? Math.floor(stats.totalUsers / stats.totalBrands)
                      : "0"}
                  </p>
                  <Progress value={80} className="h-1 mt-2" />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Collection Efficiency
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-amber-50 text-amber-700"
                    >
                      Optimized
                    </Badge>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {stats.totalBins > 0
                        ? `${(stats.itemsRecycled / stats.totalBins).toFixed(0)}`
                        : "0"}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      items/bin
                    </span>
                  </div>
                  <Progress value={85} className="h-1 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Network Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-none bg-gray-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">Active Brands</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {stats.totalBrands}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    12%
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none bg-gray-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {stats.totalUsers}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    8%
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none bg-gray-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">Collection Points</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {stats.totalBins}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    5%
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none bg-gray-50">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-600">Items Recycled</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {stats.itemsRecycled.toLocaleString()}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    15%
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {recentChallenges && recentChallenges.length > 0 && (
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Recent Challenges
                </CardTitle>
                {/* <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/challenges">View All</Link>
                </Button> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {challenge.label}
                        </p>
                        <Badge
                          variant="secondary"
                          className={
                            challenge.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {challenge.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        by {challenge.brand.name} •{" "}
                        {challenge._count.participations} participants
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/challenges/${challenge.id}`}>
                        Review
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
