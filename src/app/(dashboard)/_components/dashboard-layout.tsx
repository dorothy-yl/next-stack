"use client";

import { Button } from "@/components/ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Apple, Boxes, Ruler, Utensils } from "lucide-react";
import { usePathname } from "next/navigation";

type RouteGroupType = {
  group: string;
  items:{
    herf: string;
    label: string;
    icon:ReactNode;
  }[];
}[];

const ROUTE_GROUPS: RouteGroupType = [
  {
    group: "Foods Management",
    items: [
      {
        herf:"/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />
      },
      {
        herf:"/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />
      },
      {
        herf:"/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />
      }
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        herf:"/client",
        label: "Meals",
        icon: <Utensils className="mr-2 size-3" />
      }
    ],
  },
];

type RouteGroupProps = RouteGroupType;

type RouteGroup= ({group,items}:RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return <Collapsible.Root open={open}></Collapsible.Root>
}



type DashboardLayoutProps = { children: ReactNode };

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button size="icon" variant="outline">
            <Menu className="w-5 h-5" />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>

      <Collapsible.Root className="fixed left-0 top-0 z-20 h-dvh" open={open} onOpenChange={setOpen}>
        <Collapsible.Content forceMount>
        <div className={`bg-background fixed left-0 top-0 h-screen w-64 border p-4 
        transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex items-center justify-center">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2"/>
            <div className="mt-4">
              <p>Route 1</p>
              <p>Route 2</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main className={'transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}'}>
      {children}
      </main>
      </div>
  );
};
export default DashboardLayout;
