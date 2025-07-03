"use client";

import BrandRewardForm from "@/components/brandDashboard/brand-reward-form";

export default function RewardFormPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <BrandRewardForm challengeId={params.id} />
    </div>
  );
}
