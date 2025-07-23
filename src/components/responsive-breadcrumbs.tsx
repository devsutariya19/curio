"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { flattenSlug, formatTitle } from "@/lib/utils";
import React, { useState } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";

const ITEMS_TO_SHOW = 3;

export default function ResponsiveBreadcrumb({ slug = [] }: { slug: string[] }) {
  const items = slug.map((segment, index) => ({
    href: flattenSlug(slug.slice(0, index + 1)),
    label: formatTitle(segment),
  }));
  const [open, setOpen] = useState(false);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="lg:hidden">
          <SidebarTrigger/>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="lg:hidden"/>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs" className="text-gray-400 hover:text-white">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.length > ITEMS_TO_SHOW ? (
          <>
            <BreadcrumbItem>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {items.slice(0, -2).map((item, index) => (
                    <DropdownMenuItem key={index} disabled className="cursor-default">
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {items.slice(items.length > ITEMS_TO_SHOW ? -2 : 0).map((item, index, arr) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {index === arr.length -1 ? (
                <BreadcrumbPage className="text-white">{item.label}</BreadcrumbPage>
              ) : (
                <span className="font-medium text-gray-400">{item.label}</span>
              )}
            </BreadcrumbItem>
            {index < arr.length -1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
