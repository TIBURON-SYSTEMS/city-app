"use client";

import { Search, Bell, User, Settings, LogOut, Shield, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  user?: {
    name?: string;
    email: string;
    picture?: string;
  };
}

export function DashboardHeader({ title, description, user }: DashboardHeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <Input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 border-gray-600 rounded-lg pl-10 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </Button>
          
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.picture} alt={user?.name || user?.email} />
                  <AvatarFallback className="bg-green-500 text-white">
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-white leading-none">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-400 leading-none">
                    {user?.email}
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-400 border-green-500/20 w-fit">
                    Admin
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-700 cursor-pointer" asChild>
                <a href="/auth/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}