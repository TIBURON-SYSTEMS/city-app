"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityItem } from "@/components/dashboard/activity-item";
import { LocationItem } from "@/components/dashboard/location-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  CheckCircle,
  MapPin,
  Zap,
  UserPlus,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface DashboardContentProps {
  user?: {
    name?: string;
    email: string;
    picture?: string;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const trendsChartRef = useRef<HTMLCanvasElement>(null);
  const materialChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    
    if (trendsChartRef.current) {
      const ctx = trendsChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Items Recycled",
                data: [1200, 1900, 1500, 2500, 2200, 2800, 2400],
                borderColor: "rgb(34, 197, 94)",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                tension: 0.4,
              },
              {
                label: "New Users",
                data: [200, 300, 280, 350, 320, 380, 340],
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "rgb(156, 163, 175)",
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(75, 85, 99, 0.2)",
                },
                ticks: {
                  color: "rgb(156, 163, 175)",
                },
              },
              y: {
                grid: {
                  color: "rgba(75, 85, 99, 0.2)",
                },
                ticks: {
                  color: "rgb(156, 163, 175)",
                },
              },
            },
          },
        });
      }
    }

    
    if (materialChartRef.current) {
      const ctx = materialChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Plastic", "Paper", "Glass", "Metal", "Electronics"],
            datasets: [
              {
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                  "rgb(34, 197, 94)",
                  "rgb(59, 130, 246)",
                  "rgb(168, 85, 247)",
                  "rgb(251, 191, 36)",
                  "rgb(239, 68, 68)",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  color: "rgb(156, 163, 175)",
                },
              },
            },
          },
        });
      }
    }
  }, []);

  return (
    <>
      <DashboardHeader
        title="Dashboard Overview"
        description="Monitor your recycling network performance"
        user={user}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Users"
            value="24,387"
            icon={Users}
            change="+12%"
            changeType="positive"
            iconColor="text-blue-400"
            iconBgColor="bg-blue-500/10"
          />
          <StatsCard
            title="Items Recycled"
            value="156,428"
            icon={CheckCircle}
            change="+8%"
            changeType="positive"
            iconColor="text-green-400"
            iconBgColor="bg-green-500/10"
          />
          <StatsCard
            title="Collection Points"
            value="89"
            icon={MapPin}
            change="+3"
            changeType="positive"
            iconColor="text-purple-400"
            iconBgColor="bg-purple-500/10"
          />
          <StatsCard
            title="CO2 Saved"
            value="12.4t"
            icon={Zap}
            change="+24%"
            changeType="positive"
            iconColor="text-amber-400"
            iconBgColor="bg-amber-500/10"
          />
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-white">
                Recycling Trends
              </CardTitle>
              <Tabs defaultValue="7d" className="w-auto">
                <TabsList className="bg-gray-700">
                  <TabsTrigger
                    value="7d"
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                  >
                    7D
                  </TabsTrigger>
                  <TabsTrigger value="30d">30D</TabsTrigger>
                  <TabsTrigger value="90d">90D</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <canvas ref={trendsChartRef} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-white">
                Material Distribution
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <canvas ref={materialChartRef} />
              </div>
            </CardContent>
          </Card>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium text-white">
                Recent Activity
              </CardTitle>
              <Button
                variant="link"
                className="text-green-400 hover:text-green-300"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  <ActivityItem
                    icon={UserPlus}
                    title="342 new users registered"
                    time="2 hours ago"
                    iconColor="text-green-400"
                    iconBgColor="bg-green-500/10"
                  />
                  <ActivityItem
                    icon={MapPin}
                    title="New collection point added"
                    time="4 hours ago"
                    iconColor="text-blue-400"
                    iconBgColor="bg-blue-500/10"
                  />
                  <ActivityItem
                    icon={BarChart3}
                    title="Weekly report generated"
                    time="6 hours ago"
                    iconColor="text-purple-400"
                    iconBgColor="bg-purple-500/10"
                  />
                  <ActivityItem
                    icon={AlertTriangle}
                    title="System maintenance scheduled"
                    time="8 hours ago"
                    iconColor="text-amber-400"
                    iconBgColor="bg-amber-500/10"
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium text-white">
                Top Performing Locations
              </CardTitle>
              <Button
                variant="link"
                className="text-green-400 hover:text-green-300"
              >
                View Map
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <LocationItem
                  name="Downtown Community Center"
                  items="2,847 items this month"
                  change="+18%"
                  changeType="positive"
                  statusColor="bg-green-400"
                />
                <LocationItem
                  name="Greenway Shopping Mall"
                  items="2,341 items this month"
                  change="+12%"
                  changeType="positive"
                  statusColor="bg-blue-400"
                />
                <LocationItem
                  name="University Campus"
                  items="1,956 items this month"
                  change="+8%"
                  changeType="positive"
                  statusColor="bg-purple-400"
                />
                <LocationItem
                  name="Central Park Station"
                  items="1,678 items this month"
                  change="-3%"
                  changeType="negative"
                  statusColor="bg-amber-400"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
