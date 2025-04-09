import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { AuroraBackground } from '../components/ui/aurora-background';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';  // Make sure to export storage from your config

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Settings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUsername(currentUser.displayName || currentUser.email.split('@')[0]);
        // Enhanced profile picture handling
        if (currentUser.photoURL) {
          const photoURL = currentUser.photoURL;
          // For Google Auth photos, ensure we get the proper size
          const updatedPhotoURL = photoURL.includes('googleusercontent.com') 
            ? photoURL.replace(/=s\d+/, '=s400') // Request a 400px image
            : photoURL;
          setProfilePic(updatedPhotoURL);
          localStorage.setItem('profilePic', updatedPhotoURL);
        }
      } else {
        navigate('/login');
      }
    });

    // Load other existing data
    const savedTimeSpent = parseInt(localStorage.getItem('timeSpent') || '0');
    setTimeSpent(savedTimeSpent);

    // Start tracking time
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
  // Add new state variables
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    // Load existing user data
    const savedUsername = localStorage.getItem('username') || '';
    const savedProfilePic = localStorage.getItem('profilePic') || '';
    const savedTimeSpent = parseInt(localStorage.getItem('timeSpent') || '0');
    // Load new settings
    const savedEmail = localStorage.getItem('email') || '';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedNotifications = localStorage.getItem('notifications') !== 'false';
    const savedLanguage = localStorage.getItem('language') || 'english';
    
    setUsername(savedUsername);
    setProfilePic(savedProfilePic);
    setTimeSpent(savedTimeSpent);
    setEmail(savedEmail);
    setDarkMode(savedDarkMode);
    setNotifications(savedNotifications);
    setLanguage(savedLanguage);
    // Start tracking time
    const interval = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        localStorage.setItem('timeSpent', newTime.toString());
        return newTime;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !user) return;

    try {
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      
      // Update all states and storage at once
      setProfilePic(downloadURL);
      localStorage.setItem('profilePic', downloadURL);
      setUser(prev => ({ ...prev, photoURL: downloadURL }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Add this state near other state declarations
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handleUsernameSubmit = (event) => {
    if (event.key === 'Enter' || event.type === 'blur') {
      if (username.trim().length >= 2) {
        localStorage.setItem('username', username);
        setIsEditingUsername(false);
      }
    }
  };

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const handleLogout = async () => {
      try {
        await auth.signOut();
        localStorage.clear();
        navigate('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

  return (
    <AuroraBackground>
      <div style={{ 
        minHeight: '100vh', 
        color: '#ffffff', 
        paddingTop: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="md">
          <Box sx={{ position: 'absolute', top: '2rem', left: '2rem' }}>
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center justify-center relative z-10 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-[#999] outline-none focus-visible:outline-0"
            >
              <svg
                fill="currentColor"
                stroke="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
              >
                <path
                  className="group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
                  d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
                ></path>
                <path
                  className="group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
                  d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
                ></path>
                <path
                  className="group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
                  d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
                ></path>
              </svg>
            </button>
          </Box>
          <Paper sx={{ 
            p: 4, 
            backgroundColor: 'rgba(30, 30, 30, 0.4)', 
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            width: '40vw',
            maxWidth: '900px',
            margin: '0 auto',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
                Settings
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                >
                  <div
                    className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    Logout
                  </div>
                </button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, my: 4 }}>
              <Avatar
                src={profilePic}
                alt={username || 'User'}
                sx={{ 
                  width: 120, 
                  height: 120,
                  bgcolor: '#1976d2', // Default background color if no image
                  fontSize: '3rem' // Larger font size for initials
                }}
              >
                {username ? username[0].toUpperCase() : 'U'}
              </Avatar>
              {isEditingUsername ? (
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyDown={handleUsernameSubmit}
                  onBlur={handleUsernameSubmit}
                  autoFocus
                  sx={{
                    maxWidth: '300px',
                    '& .MuiOutlinedInput-root': {
                      color: '#ffffff',
                      '& fieldset': { borderColor: '#ffffff3b' },
                      '&:hover fieldset': { borderColor: '#ffffff8a' },
                    },
                    '& .MuiInputLabel-root': { color: '#ffffff8a' }
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    {username || 'Anonymous'}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setIsEditingUsername(true)}
                    sx={{ 
                      borderRadius: '15px',
                      color: '#ffffff8a',
                      '&:hover': { color: '#ffffff' }
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              )}
              <Button
                component="label"
                variant="contained"
                sx={{ 
                  borderRadius: '20px',
                  backgroundColor: '#2196f3',
                  '&:hover': { backgroundColor: '#1976d2' }
                }}
              >
                Upload Profile Picture
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Box>

            {/* Remove the original username TextField Box */}
            <Box sx={{ mt: 4, p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Time Spent on Platform
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 auto', minWidth: '200px' }}>
                  <PieChart width={200} height={200}>
                    <Pie
                      data={getTimeData(timeSpent)}
                      cx={100}
                      cy={100}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {getTimeData(timeSpent).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </Box>
                <Box sx={{ flex: '1 1 auto', minWidth: '200px' }}>
                  <Typography variant="h6" gutterBottom>
                    Total Time: {formatTime(timeSpent)}
                  </Typography>
                  {getTimeData(timeSpent).map((entry, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          backgroundColor: COLORS[index % COLORS.length],
                          mr: 2,
                          borderRadius: '50%'
                        }}
                      />
                      <Typography sx={{ flex: 1 }}>
                        {entry.name}
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {entry.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>
    </AuroraBackground>
  );
};

export default Settings;


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    localStorage.setItem('email', event.target.value);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    localStorage.setItem('notifications', (!notifications).toString());
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };
