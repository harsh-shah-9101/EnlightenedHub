import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase/config'; // Make sure this is your Firestore instance
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [authUsers, setAuthUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]); // Add this line

  // Sidebar items
  const sidebarItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <IconHome className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard')
    },
    {
      href: "/dashboard/courses",
      title: "My Courses",
      icon: <IconBook className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard/courses')
    },
    {
      href: "/job",
      title: "Job Portal",
      icon: <IconBriefcase className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/job')
    },
    {
      href: "/dashboard/support",
      title: "Support",
      icon: <IconPhone className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard/support')
    },
    {
      href: "/dashboard/setting",
      title: "Settings",
      icon: <IconSettings className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard/setting')
    },
    {
      href: "/dashboard/ai-chat",
      title: "AI Chat",
      icon: <IconRobot className="w-5 h-5 text-emerald-500" />,
      onClick: () => navigate('/dashboard/ai-chat')
    },
    {
      href: "/",
      title: "Logout",
      icon: <IconLogout className="w-5 h-5 text-red-500" />,
      onClick: () => {
        localStorage.clear();
        navigate('/');
      }
    }
  ];

  // Replace Firestore listener with Auth listener
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const functions = getFunctions();
          const listUsers = httpsCallable(functions, 'listUsers');
          const result = await listUsers();
          
          setUsers(result.data.users);
          setAuthUsers(result.data.users);
          if (!selectedUser && result.data.users.length > 0) {
            setSelectedUser(result.data.users[0]);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          // Handle error appropriately
        }
      } else {
        setUsers([]);
        setAuthUsers([]);
        setSelectedUser(null);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Remove the login history useEffect since it was Firestore-specific
  
  // Modify active users count to use auth status
  const activeUsers = users.filter(u => u.status === "active").length;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <Sidebar>
        <SidebarBody>
          {sidebarItems.map((item) => (
            <SidebarLink key={item.title} link={item} />
          ))}
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Users</h2>
                <div className="flex gap-4 mt-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Total Users: {users.length}</span>
                  <span className="bg-green-100 px-3 py-1 rounded-full text-xs text-green-700">Active Users: {activeUsers}</span>
                  <span className="bg-blue-100 px-3 py-1 rounded-full text-xs text-blue-700">Auth Users: {authUsers.length}</span>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[500px] grid grid-cols-1 gap-4">
              {users.map(user => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${selectedUser?.id === user.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{user.displayName || user.email}</span>
                      <span className={`text-xs ml-2 ${user.status === "online" ? "text-green-600" : "text-gray-400"}`}>
                        ● {user.status === "online" ? "Online" : "Offline"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-gray-400">ID: <span className="font-mono text-blue-600">{user.id}</span></span>
                      <span className="text-xs text-gray-400">Last login: {user.lastLogin ? new Date(user.lastLogin.seconds * 1000).toLocaleString() : "N/A"}</span>
                      <span className="text-xs text-gray-400">IP: {user.lastIP || "N/A"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Login History Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Login History</h2>
              <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-medium hover:bg-blue-200">
                Show Mixed History
              </button>
            </div>
            <div className="overflow-y-auto max-h-[500px] flex flex-col gap-4">
              {loginHistory.length === 0 && (
                <div className="text-gray-400 text-center">No login history found.</div>
              )}
              {loginHistory.map((entry, idx) => (
                <div key={idx} className="bg-blue-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-blue-800">{selectedUser?.displayName || selectedUser?.email}</span>
                  </div>
                  <div className="bg-blue-100 text-xs rounded px-2 py-1 mb-2 text-blue-700 break-all">
                    {entry.userAgent}
                  </div>
                  <div className="text-xs text-gray-600">Timestamp: {entry.timestamp ? new Date(entry.timestamp.seconds * 1000).toLocaleString() : "N/A"}</div>
                  <div className="text-xs text-gray-600">IP Address: {entry.ip || "N/A"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;