import { UserWithBrand } from "@/app/types/brand-dashboard";
import Image from "next/image";

export default async function BrandNavHeader({
  user,
}: {
  user: UserWithBrand;
}) {
  return (
    <a href="#" className="flex gap-3 items-center">
      {/* <Building2 className="size-5" />
       */}
      <Image
        src="/Tiburon-LOGO_BLACK.png"
        alt="Tiburón Logo"
        width={120}
        height={40}
        className="h-10 w-auto"
      />
      <span className="text-normal font-semibold">{user.brand?.name}</span>
    </a>
  );
}
