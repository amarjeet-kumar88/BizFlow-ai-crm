"use client";

import ThemeToggle from "./theme-toggle";
import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-40 bg-background border-b p-4 flex justify-between items-center">
      <Input placeholder="Search leads, customers..." className="max-w-sm" />

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Bell className="cursor-pointer" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                className="rounded-full h-10 w-10"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-medium">
                  {user?.name || "User"}
                </div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
