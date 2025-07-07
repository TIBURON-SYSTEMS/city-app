import BrandEditProfile from "@/components/brandDashboard/brand-edit-profile";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return id;
}

export default async function EditPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return <BrandEditProfile brandId={id} />;
}
