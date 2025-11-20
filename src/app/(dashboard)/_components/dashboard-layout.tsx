"use client";

import { Button } from "@/components/ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Apple,
  Boxes,
  Ruler,
  Utensils,
  ChevronLeft,
  ChevronDown,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar as Avtar } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { z } from "zod";
import { customErrorMap } from "@/lib/customErrorMap";
z.setErrorMap(customErrorMap);

type RouteGroupType = {
  group: string;
  items: {
    herf: string;
    label: string;
    icon: ReactNode;
  }[];
};

const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: "Foods Management",
    items: [
      {
        herf: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        herf: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        herf: "/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        herf: "/client",
        label: "Meals",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

type RouteGroupProps = {
  group: string;
  items: {
    herf: string;
    label: string;
    icon: ReactNode;
  }[];
};

const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 w-full font-normal"
          variant="ghost"
        >
          {group}
          <div
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown />
          </div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={
            'flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}'
          }
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className=" w-full font-normal justify-start"
              variant="link"
              asChild
              key={item.herf}
            >
              <Link
                className={`flex items-center px-5 py-1 transition-all
               ${
                 pathname === item.herf
                   ? "bg-foreground/10 hover:bg-foreground/5"
                   : "hover:bg-foreground/10"
               }`}
                href={item.herf}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

type DashboardLayoutProps = { children: ReactNode };

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
    <div className="bg-background fixed z-10 flex h-13 w-screen items-center justify-between border px-2">
      <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="m-2" asChild>
          <Button size="icon" variant="outline">
            <Menu className="w-5 h-5" />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>
      <div className="flex">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-9 items-center gap-2 px-2"
            >
              <Avatar className="size-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="flex items-center gap-3 px-2 py-1.5">
              <Avtar className="size-10">
                <AvatarFallback>A</AvatarFallback>
              </Avtar>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-muted-foreground text-xs">admin@text.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            onClick={() => {
              //logout
            }}
            variant="destructive"
            >
              <LogOut className="w-4 h-4" />Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    
      <Collapsible.Root
        className="fixed left-0 top-0 z-20 h-dvh"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed left-0 top-0 h-screen w-64 border p-4 
        transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2" />
            <div className="mt-4">
              {ROUTE_GROUPS.map((routeGroup) => (
                <RouteGroup {...routeGroup} key={routeGroup.group} />
              ))}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={
          'transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}'
        }
      >
        {children}
      </main>
    </div>
    
  );
};
export default DashboardLayout;
