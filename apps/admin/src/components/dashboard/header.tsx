"use client";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  user?: {
    name?: string;
    email: string;
    picture?: string;
  };
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="bg-background border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}
