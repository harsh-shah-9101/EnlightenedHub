import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconRobot, IconLogout } from "@tabler/icons-react";
import React from 'react';

export const getNavigationItems = (navigate) => [
  {
    title: "Dashboard",
    href: "/dashboard",
    onClick: () => navigate('/dashboard'),
    icon: <IconHome className="text-neutral-500 dark:text-neutral-400" />,
  },
  // ... rest of the navigation items
];