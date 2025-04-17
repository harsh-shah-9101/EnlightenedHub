import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Avatar, Divider } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import { auth, storage } from '../firebase/config';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import LightAnimatedBackground from '../components/LightAnimatedBackground';
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";

const Settings = () => {
  const navigate = useNavigate();
  
  // Add sidebar items
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
  const [timeSpent, setTimeSpent] = useState(0);
  const [username, setUsername] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUsername(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
      }
    });

    const savedTimeSpent = parseInt(localStorage.getItem('timeSpent') || '0');
    setTimeSpent(savedTimeSpent);

    const interval = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        localStorage.setItem('timeSpent', newTime.toString());
        return newTime;
      });
    }, 60000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [navigate]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} days ${hours % 24} hours`;
    }
    if (hours > 0) {
      return `${hours} hours ${minutes % 60} minutes`;
    }
    return `${minutes} minutes`;
  };

  const getTimeData = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    return [
      { name: 'Days', value: days },
      { name: 'Hours', value: hours % 24 },
      { name: 'Minutes', value: minutes % 60 }
    ].filter(item => item.value > 0);
  };

  const COLORS = ['#3f51b5', '#4caf50', '#ff9800'];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody>
          {sidebarItems.map((item) => (
            <SidebarLink key={item.title} link={item} />
          ))}
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <LightAnimatedBackground>
        <Container sx={{ py: 4 }}>
          <Paper sx={{ 
            p: 4, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            backdropFilter: 'blur(10px)',
            color: '#333333',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: 2
          }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom color="primary">
                Profile Settings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  src={photoURL}
                  sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
                >
                  {username ? username[0].toUpperCase() : '?'}
                </Avatar>
                <Box>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-photo-upload"
                    type="file"
                    onChange={async (e) => {
                      if (e.target.files[0]) {
                        setLoading(true);
                        try {
                          const file = e.target.files[0];
                          const storageRef = ref(storage, `profile_photos/${auth.currentUser.uid}`);
                          
                          if (photoURL) {
                            try {
                              await deleteObject(ref(storage, photoURL));
                            } catch (error) {
                              console.error('Error deleting old photo:', error);
                            }
                          }
                          
                          await uploadBytes(storageRef, file);
                          const downloadURL = await getDownloadURL(storageRef);
                          await updateProfile(auth.currentUser, { photoURL: downloadURL });
                          setPhotoURL(downloadURL);
                        } catch (error) {
                          console.error('Error uploading photo:', error);
                        }
                        setLoading(false);
                      }
                    }}
                  />
                  <label htmlFor="profile-photo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{ mr: 1, color: 'primary.main', borderColor: 'primary.main' }}
                      disabled={loading}
                    >
                      Upload Photo
                    </Button>
                  </label>
                  {photoURL && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const storageRef = ref(storage, photoURL);
                          await deleteObject(storageRef);
                          await updateProfile(auth.currentUser, { photoURL: '' });
                          setPhotoURL('');
                        } catch (error) {
                          console.error('Error deleting photo:', error);
                        }
                        setLoading(false);
                      }}
                      disabled={loading}
                    >
                      Remove Photo
                    </Button>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, width: '100%' }}>
                {isEditing ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <TextField
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      variant="outlined"
                      size="large"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#333',
                          fontSize: '1.1rem',
                          '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                            borderRadius: 2
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main'
                          }
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ 
                        borderRadius: 2,
                        px: 4,
                        minWidth: '100px'
                      }}
                      onClick={async () => {
                        setLoading(true);
                        try {
                          await updateProfile(auth.currentUser, { displayName: username });
                          setIsEditing(false);
                        } catch (error) {
                          console.error('Error updating username:', error);
                        }
                        setLoading(false);
                      }}
                      disabled={loading}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        setUsername(auth.currentUser.displayName || '');
                        setIsEditing(false);
                      }}
                      sx={{ 
                        color: 'primary.main', 
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        px: 3,
                        '&:hover': {
                          borderColor: 'primary.dark'
                        }
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ flex: 1, fontSize: '1.2rem', color: '#333' }}>
                      Username: {username || 'Not set'}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setIsEditing(true)}
                      sx={{ 
                        color: 'primary.main', 
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        px: 4,
                        '&:hover': {
                          borderColor: 'primary.dark'
                        }
                      }}
                    >
                      Edit Username
                    </Button>
                  </Box>
                )}
              </Box>
              <Divider sx={{ my: 4, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />
            </Box>
            <Typography variant="h4" gutterBottom color="primary">
              Time Spent Statistics
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              flexWrap: 'wrap',
              gap: 4
            }}>
              <Box sx={{ flex: '1 1 auto', minWidth: '300px' }}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={getTimeData(timeSpent)}
                    cx={150}
                    cy={150}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getTimeData(timeSpent).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </Box>
              <Box sx={{ flex: '1 1 auto', minWidth: '300px' }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#333' }}>
                  Total Time: {formatTime(timeSpent)}
                </Typography>
                {getTimeData(timeSpent).map((entry, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: COLORS[index % COLORS.length],
                        mr: 2,
                        borderRadius: '50%'
                      }}
                    />
                    <Typography sx={{ flex: 1, fontSize: '1.1rem', color: '#333' }}>
                      {entry.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                      {entry.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Container>
      </LightAnimatedBackground>
    </div>
  );
};

export default Settings;
