"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  activateChallenge,
  deactivateChallenge,
  removeChallenge,
} from "./actions";
import { toast } from "sonner";

interface AdminActionsProps {
  challengeId: string;
  challengeStatus: string;
  brandId: string;
}

export function AdminActions({
  challengeId,
  challengeStatus,
  brandId,
}: AdminActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleActivate = async () => {
    setIsLoading(true);
    try {
      const result = await activateChallenge(challengeId);
      if (result.success) {
        toast.success("Challenge activated successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to activate challenge");
      }
    } catch {
      toast.error("An error occurred while activating the challenge");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      const result = await deactivateChallenge(challengeId);
      if (result.success) {
        toast.success("Challenge deactivated successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to deactivate challenge");
      }
    } catch {
      toast.error("An error occurred while deactivating the challenge");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (
      !confirm(
        "Are you sure you want to remove this challenge? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await removeChallenge(challengeId);
      if (result?.success === false) {
        toast.error(result.error || "Failed to remove challenge");
        setIsLoading(false);
      } else {
        toast.success("Challenge removed successfully");
      }
    } catch {
      toast.error("An error occurred while removing the challenge");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3">
      {challengeStatus === "inactive" && (
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleActivate}
          disabled={isLoading}
        >
          {isLoading ? "Activating..." : "Approve & Activate"}
        </Button>
      )}
      {challengeStatus === "active" && (
        <Button
          variant="secondary"
          onClick={handleDeactivate}
          disabled={isLoading}
        >
          {isLoading ? "Deactivating..." : "Deactivate"}
        </Button>
      )}
      <Button variant="destructive" onClick={handleRemove} disabled={isLoading}>
        {isLoading ? "Removing..." : "Remove Challenge"}
      </Button>
      <Button variant="outline" asChild>
        <Link href={`/dashboard/brands/${brandId}`}>View Brand Details</Link>
      </Button>
    </div>
  );
}
