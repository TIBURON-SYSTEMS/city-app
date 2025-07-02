import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export default function BrandCardLayout({
  children,
  title,
  icon: Icon,
  description,
}: {
  children: React.ReactNode;
  title: string;
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <Icon className="h-6 w-6 text-black" />
              </div>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                {title}
              </CardTitle>
            </div>
            <CardDescription className="text-slate-600">
              {description}
            </CardDescription>
          </CardHeader>

          <Separator className="bg-slate-200" />

          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
