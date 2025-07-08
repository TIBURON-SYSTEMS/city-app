"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Target,
  CheckCircle,
  Clock,
  Calendar,
  Users,
  Gift,
} from "lucide-react";
import Link from "next/link";

interface Challenge {
  id: string;
  label: string;
  status: string;
  goal: number;
  createdAt: Date;
  endDate: Date;
  brand: {
    id: string;
    name: string;
  };
  _count: {
    participations: number;
    rewards: number;
    challengeProducts: number;
  };
}

interface ChallengesContentProps {
  initialChallenges: Challenge[];
}

export function ChallengesContent({
  initialChallenges,
}: ChallengesContentProps) {
  const [challenges] = useState<Challenge[]>(initialChallenges);
  const [filteredChallenges, setFilteredChallenges] =
    useState<Challenge[]>(initialChallenges);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filterChallenges = useCallback(() => {
    let filtered = challenges;

    if (searchTerm) {
      filtered = filtered.filter(
        (challenge) =>
          challenge.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          challenge.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (challenge) => challenge.status === statusFilter
      );
    }

    setFilteredChallenges(filtered);
  }, [challenges, searchTerm, statusFilter]);

  useEffect(() => {
    filterChallenges();
  }, [filterChallenges]);

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <CheckCircle className="w-4 h-4" />
    ) : (
      <Clock className="w-4 h-4" />
    );
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  const getDaysRemaining = (endDate: Date) => {
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const pendingCount = challenges.filter((c) => c.status === "inactive").length;
  const activeCount = challenges.filter((c) => c.status === "active").length;

  return (
    <>
      <DashboardHeader
        title="Challenges Management"
        description="Review and manage all challenges"
      />

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Challenges</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {challenges.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Challenges</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {activeCount}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {pendingCount}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg font-medium text-gray-900">
                All Challenges
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Input
                    type="text"
                    placeholder="Search challenges..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="h-10 px-3 py-2 text-sm rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Pending</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredChallenges.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No challenges found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Challenge</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Time Remaining</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChallenges.map((challenge) => {
                      const daysRemaining = getDaysRemaining(challenge.endDate);
                      return (
                        <TableRow key={challenge.id}>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {challenge.label}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Users className="w-3 h-3" />
                                  {challenge._count.participations} participants
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Gift className="w-3 h-3" />
                                  {challenge._count.rewards} rewards
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-900">
                              {challenge.brand.name}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`flex items-center gap-1 w-fit ${getStatusBadgeColor(
                                challenge.status
                              )}`}
                            >
                              {getStatusIcon(challenge.status)}
                              {challenge.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Goal: {challenge.goal}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {daysRemaining > 0 ? (
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span
                                  className={
                                    daysRemaining <= 7
                                      ? "text-yellow-600 font-medium"
                                      : "text-gray-600"
                                  }
                                >
                                  {daysRemaining} days
                                </span>
                              </div>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                Expired
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link
                                href={`/dashboard/challenges/${challenge.id}`}
                              >
                                {challenge.status === "inactive"
                                  ? "Review"
                                  : "View Details"}
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
