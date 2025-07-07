"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Store,
  Mail,
  Calendar,
  Package,
  Target,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { BrandStatus } from "@/generated/prisma";
import Link from "next/link";

interface BrandDetailsProps {
  brand: {
    id: string;
    name: string;
    status: BrandStatus;
    userId: string;
    user: {
      email: string;
      createdAt: Date;
    };
    challenges: Array<{
      id: string;
      label: string;
      status: string;
      endDate: Date;
      _count: {
        participations: number;
        rewards: number;
      };
    }>;
    products: Array<{
      id: string;
      label: string;
      material: string;
    }>;
    _count: {
      challenges: number;
      products: number;
    };
  };
}

export function BrandDetails({ brand }: BrandDetailsProps) {
  const getStatusIcon = (status: BrandStatus) => {
    switch (status) {
      case BrandStatus.ACTIVE:
        return <CheckCircle className="w-5 h-5" />;
      case BrandStatus.PENDING:
        return <Clock className="w-5 h-5" />;
      case BrandStatus.REJECTED:
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusBadgeColor = (status: BrandStatus) => {
    switch (status) {
      case BrandStatus.ACTIVE:
        return "bg-green-50 text-green-700 border-green-200";
      case BrandStatus.PENDING:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case BrandStatus.REJECTED:
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <DashboardHeader
        title="Brand Details"
        description={`Viewing details for ${brand.name}`}
      />

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/brands">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Brands
          </Link>
        </Button>

        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gray-100 text-gray-700 text-xl">
                    {brand.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    {brand.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Brand ID: {brand.id}
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`flex items-center gap-1 ${getStatusBadgeColor(
                  brand.status
                )}`}
              >
                {getStatusIcon(brand.status)}
                {brand.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Contact Email</p>
                  <p className="text-sm text-gray-900">{brand.user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Registered On</p>
                  <p className="text-sm text-gray-900">
                    {format(new Date(brand.user.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Store className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">User ID</p>
                  <p className="text-sm text-gray-900">{brand.userId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Challenges</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {brand._count.challenges}
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
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {brand._count.products}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {brand.challenges.length > 0 && (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">
                Brand Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brand.challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {challenge.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {challenge._count.participations} participants •{" "}
                        {challenge._count.rewards} rewards
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          challenge.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-50 text-gray-700"
                        }
                      >
                        {challenge.status}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        Ends:{" "}
                        {format(new Date(challenge.endDate), "MMM dd, yyyy")}
                      </p>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/challenges/${challenge.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {brand.products.length > 0 && (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">
                Brand Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brand.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {product.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Material: {product.material}
                    </p>
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
