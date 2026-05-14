"use client";
import { useDashboardStore } from "@/store/dashboard.store";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menu = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads", href: "/leads", icon: Users },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];

function SidebarContent() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useDashboardStore();

  return (
    <motion.div
      animate={{ width: sidebarOpen ? 280 : 90 }}
      className="h-screen border-r bg-background p-4 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-xl">BizFlow</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ChevronLeft />
        </Button>
      </div>

      <div className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl p-3 transition ${pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <item.icon size={20} />
            {sidebarOpen && item.title}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Sidebar() {
  return (
    <>
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      <div className="md:hidden fixed left-4 top-4 z-50">
        <Sheet>
          <SheetTrigger>
            <Button size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
