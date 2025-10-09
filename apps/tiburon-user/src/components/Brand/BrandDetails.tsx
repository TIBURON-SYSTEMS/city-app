import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import BackButton from "../Buttons/BackButton";

export default function BrandDetails() {
  const { brandId } = useParams({ from: "/brand/$brandId" });

  const { data: brand } = useQuery({
    queryKey: ["brand", brandId as string],
    queryFn: () => api.getBrandInfo(brandId as string),
  });

  if (!brand) return;

  return (
    <div className="px-7 py-4 bg-white min-h-screen">
      <div className="flex flex-col py-5 px-4 border border-slate-300 rounded-xl min-h-[60vh] items-center">
        <div className="flex flex-row justify-between w-full">
          <BackButton />
        </div>

        <div className="w-full bg-white px-6 pt-10">
          <div className="flex flex-col gap-8 items-center text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {brand.name}
            </h1>

            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-full h-48 object-contain rounded-xl"
            />

            <p className="text-gray-700 max-w-2xl">{brand.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
