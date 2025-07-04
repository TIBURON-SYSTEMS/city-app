import BrandForm from "@/components/brandDashboard/brand-registration-form";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return id;
}

export default async function BrandRegistrationPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <BrandForm id={id} />
    </div>
  );
}
