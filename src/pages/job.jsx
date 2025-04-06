import React, { useState } from 'react';
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconRobot, IconSearch, IconFilter, IconMapPin, IconBuilding } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar';

const Job = () => {
  const sidebarLinks = [
    {
      href: "/dashboard",
      icon: <IconBriefcase size={20} stroke={2} color="white" />,
      label: "Dashboard"
    },
    {
      href: "/analytics",
      icon: <IconBook size={20} stroke={2} color="white" />,
      label: "Resources"
    },
    {
      href: "/messages",
      icon: <IconPhone size={20} stroke={2} color="white" />,
      label: "Messages"
    },

    {
      href: "/settings",
      icon: <IconSettings size={20} stroke={2} color="white" />,
      label: "settings"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        <SidebarBody>
          {sidebarLinks.map((link, index) => (
            <SidebarLink key={index} link={link} />
          ))}
        </SidebarBody>
      </Sidebar>
      <div 
        className="flex-1 p-8 overflow-y-auto"
        style={{
          backgroundImage: 'url("/sl_0210121_40570_34.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-white font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Job Portal</h1>
          
          {/* Search Section */}
         

          {/* Job Listings */}
         
        </div>
      </div>
    </div>
  );
};

export default Job;