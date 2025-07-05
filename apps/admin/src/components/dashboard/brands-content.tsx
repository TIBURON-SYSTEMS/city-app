"use client";

import { useEffect, useState, useCallback } from "react";
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
  Download,
  Store,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { BrandStatus } from "@/generated/prisma";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  status: BrandStatus;
  userId: string;
  user: {
    email: string;
  };
  challenges?: {
    id: string;
  }[];
  _count?: {
    challenges: number;
    products: number;
  };
}

export function BrandsContent() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BrandStatus | "ALL">("ALL");
  const [approvingBrandId, setApprovingBrandId] = useState<string | null>(null);

  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      if (data.brands) {
        setBrands(data.brands);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBrands = useCallback(() => {
    let filtered = brands;

    if (searchTerm) {
      filtered = filtered.filter(
        (brand) =>
          brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brand.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((brand) => brand.status === statusFilter);
    }

    setFilteredBrands(filtered);
  }, [brands, searchTerm, statusFilter]);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    filterBrands();
  }, [filterBrands]);

  const handleApproveBrand = async (brandId: string) => {
    setApprovingBrandId(brandId);
    try {
      const response = await fetch(`/api/brands/${brandId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Brand approved successfully");
        await fetchBrands();
      } else {
        toast.error(data.error || "Failed to approve brand");
      }
    } catch (error) {
      console.error("Error approving brand:", error);
      toast.error("An error occurred while approving the brand");
    } finally {
      setApprovingBrandId(null);
    }
  };

  const getStatusIcon = (status: BrandStatus) => {
    switch (status) {
      case BrandStatus.ACTIVE:
        return <CheckCircle className="w-4 h-4" />;
      case BrandStatus.PENDING:
        return <Clock className="w-4 h-4" />;
      case BrandStatus.REJECTED:
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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

  const exportBrands = () => {
    const csvContent = [
      ["ID", "Brand Name", "Email", "Status", "Challenges", "Products"],
      ...filteredBrands.map((brand) => [
        brand.id,
        brand.name,
        brand.user.email,
        brand.status,
        brand._count?.challenges || 0,
        brand._count?.products || 0,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brands_export_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  return (
    <>
      <DashboardHeader
        title="Brands Management"
        description="View and manage all registered brands"
      />

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Brands</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {brands.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Store className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Brands</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      brands.filter((b) => b.status === BrandStatus.ACTIVE)
                        .length
                    }
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
                  <p className="text-sm text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      brands.filter((b) => b.status === BrandStatus.PENDING)
                        .length
                    }
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
                All Brands
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Input
                    type="text"
                    placeholder="Search brands..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="h-10 px-3 py-2 text-sm rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as BrandStatus | "ALL")
                  }
                >
                  <option value="ALL">All Status</option>
                  <option value={BrandStatus.ACTIVE}>Active</option>
                  <option value={BrandStatus.PENDING}>Pending</option>
                  <option value={BrandStatus.REJECTED}>Rejected</option>
                </select>
                <Button variant="outline" size="sm" onClick={exportBrands}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading brands...
              </div>
            ) : filteredBrands.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No brands found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Challenges</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gray-100 text-gray-700">
                                {brand.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {brand.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {brand.user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`flex items-center gap-1 w-fit ${getStatusBadgeColor(
                              brand.status
                            )}`}
                          >
                            {getStatusIcon(brand.status)}
                            {brand.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {brand._count?.challenges || 0}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {brand._count?.products || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {brand.status === BrandStatus.PENDING && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleApproveBrand(brand.id)}
                                disabled={approvingBrandId === brand.id}
                              >
                                {approvingBrandId === brand.id
                                  ? "Approving..."
                                  : "Approve"}
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" asChild>
                              <a href={`/dashboard/brands/${brand.id}`}>
                                View Details
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
