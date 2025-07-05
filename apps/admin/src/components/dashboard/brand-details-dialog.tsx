"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  Target,
  Package,
} from "lucide-react";
import { BrandStatus } from "@/generated/prisma";

interface Brand {
  id: string;
  name: string;
  status: BrandStatus;
  userId: string;
  user: {
    email: string;
  };
  _count?: {
    challenges: number;
    products: number;
  };
}

interface BrandDetailsDialogProps {
  brand: Brand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrandDetailsDialog({
  brand,
  open,
  onOpenChange,
}: BrandDetailsDialogProps) {
  if (!brand) return null;

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
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case BrandStatus.PENDING:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case BrandStatus.REJECTED:
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Store className="w-5 h-5 text-purple-400" />
            Brand Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            View detailed information about this brand
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              {brand.name}
            </h3>
            <Badge
              variant="secondary"
              className={`flex items-center gap-1 w-fit ${getStatusBadgeColor(
                brand.status
              )}`}
            >
              {getStatusIcon(brand.status)}
              {brand.status}
            </Badge>
          </div>

          <Separator className="bg-gray-700" />

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">
              Contact Information
            </h4>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-300">{brand.user.email}</span>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Challenges</span>
                </div>
                <p className="text-xl font-semibold text-white">
                  {brand._count?.challenges || 0}
                </p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-400">Products</span>
                </div>
                <p className="text-xl font-semibold text-white">
                  {brand._count?.products || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">
              Additional Information
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                Brand ID: <span className="text-gray-400">{brand.id}</span>
              </p>
              <p>
                User ID: <span className="text-gray-400">{brand.userId}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
