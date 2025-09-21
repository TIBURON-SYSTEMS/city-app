import { PageContent } from "@/types/nav";

interface HeaderProps {
  status: PageContent;
}

export default function Header({ status }: HeaderProps) {
  return (
    <header className="px-5 pt-8 pb-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {status === PageContent.CHALLENGES && "All Challenges"}
        {status === PageContent.CAMERA && "Camera"}
        {status === PageContent.MAP && "Map"}
        {status === PageContent.PROFILE && "Profile"}
      </h1>
    </header>
  );
}
