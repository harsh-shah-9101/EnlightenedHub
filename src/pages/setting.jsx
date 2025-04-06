import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuroraBackground } from '../components/ui/aurora-background';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add this state near other state declarations
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    localStorage.setItem('username', event.target.value);
    setIsEditingUsername(false);
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

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Navigate to login page
    navigate('/login');
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
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
              sx={{
                borderRadius: '20px',
                backgroundColor: '#2196f3',
                '&:hover': { backgroundColor: '#1976d2' }
              }}
            >
              Back to Dashboard
            </Button>
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
               
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#d32f2f',
                    '&:hover': { backgroundColor: '#b71c1c' }
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, my: 4 }}>
              <Avatar
                src={profilePic}
                sx={{ width: 120, height: 120 }}
              />
              {isEditingUsername ? (
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={() => setIsEditingUsername(false)}
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