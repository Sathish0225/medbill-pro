import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  Stethoscope,
  Receipt,
  CalendarPlus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "receptionist", "billing_clerk", "doctor"],
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
    roles: ["admin", "receptionist", "doctor"],
  },
  {
    title: "Register Patient",
    href: "/patients/register",
    icon: UserPlus,
    roles: ["admin", "receptionist"],
  },
  {
    title: "Create Bill",
    href: "/billing/create",
    icon: CalendarPlus,
    roles: ["admin", "receptionist", "billing_clerk"],
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: FileText,
    roles: ["admin", "receptionist", "billing_clerk"],
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
    roles: ["admin", "billing_clerk"],
  },
  {
    title: "Services",
    href: "/services",
    icon: Stethoscope,
    roles: ["admin"],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: ["admin", "billing_clerk"],
  },
  {
    title: "Search",
    href: "/search",
    icon: Search,
    roles: ["admin", "receptionist", "billing_clerk", "doctor"],
  },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)] shadow-card">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
