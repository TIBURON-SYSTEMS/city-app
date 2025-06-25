import { Card } from "./ui/card";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Card className="flex flex-col py-[20pt] px-[16pt] w-full mb-4 border border-slate-300">
        {children}
      </Card>
    </>
  );
}
