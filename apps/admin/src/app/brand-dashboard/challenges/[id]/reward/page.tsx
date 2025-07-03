import BrandRewardForm from "@/components/brandDashboard/brand-reward-form";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return id;
}

export default async function RewardFormPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return (
    <div>
      <BrandRewardForm challengeId={id} />
    </div>
  );
}
