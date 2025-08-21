import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, TextField, Button, Box, Slider, IconButton, Stack, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip, useMediaQuery } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Fullscreen, ArrowBack, PlayCircleOutline, Download, Share, ThumbUp, ThumbUpOutlined, NoteAdd, Description } from '@mui/icons-material';
// Replace DarkAnimatedBackground with LightAnimatedBackground
import LightAnimatedBackground from '../components/LightAnimatedBackground';
// Import Sidebar components
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";
import { FloatingDock } from "../components/ui/floating-dock";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState([]);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [liked, setLiked] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const [materials, setMaterials] = useState([
    { id: 1, name: 'Course Slides', type: 'PDF', url: '#' },
    { id: 2, name: 'Exercise Files', type: 'ZIP', url: '#' },
    { id: 3, name: 'Additional Resources', type: 'PDF', url: '#' },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const navigate = useNavigate();

  // Add sidebar items
  const navigationItems = [
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

  useEffect(() => {
    // Load course data from localStorage
    const storedCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
    console.log('Stored courses:', storedCourses); // Debug log

    const currentCourse = storedCourses.find(c => c.id === courseId);
    console.log('Current course:', currentCourse); // Debug log
    
    if (currentCourse) {
      // Ensure videoUrl exists and is properly formatted
      if (currentCourse.videoUrl) {
        console.log('Original video URL:', currentCourse.videoUrl); // Debug log
        
        // Handle both YouTube and direct video URLs
        if (currentCourse.videoUrl.includes('youtube.com') || currentCourse.videoUrl.includes('youtu.be')) {
          const videoId = currentCourse.videoUrl.match(
            /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^?&]+)/
          );
          
          if (videoId) {
            currentCourse.videoUrl = `https://www.youtube.com/embed/${videoId[1]}`;
            console.log('Converted YouTube URL:', currentCourse.videoUrl); // Debug log
          }
        }
      } else {
        console.warn('No video URL found for course:', currentCourse);
      }
      setCourse(currentCourse);
    }

    // Load queries from localStorage
    const storedQueries = JSON.parse(localStorage.getItem(`queries_${courseId}`) || '[]');
    setQueries(storedQueries);

    // Load notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${courseId}`) || '[]');
    setNotes(storedNotes);

    // Load progress from localStorage
    const storedProgress = parseInt(localStorage.getItem(`progress_${courseId}`) || '0');
    setProgress(storedProgress);

    // Load liked status from localStorage
    const storedLiked = JSON.parse(localStorage.getItem(`liked_${courseId}`) || 'false');
    setLiked(storedLiked);
  }, [courseId]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => setCurrentTime(video.currentTime);
      const handleLoadedMetadata = () => setDuration(video.duration);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (_, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (_, newValue) => {
    if (videoRef.current) {
      videoRef.current.volume = newValue;
      setVolume(newValue);
      setIsMuted(newValue === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const newQuery = {
        id: Date.now(),
        text: query,
        timestamp: new Date().toISOString(),
      };
      const updatedQueries = [...queries, newQuery];
      setQueries(updatedQueries);
      localStorage.setItem(`queries_${courseId}`, JSON.stringify(updatedQueries));
      setQuery('');
    }
  };

  if (!course) {
    return (
      <div className="flex h-screen overflow-hidden">
        {!isMobile && (
          <Sidebar>
            <SidebarBody>
              {navigationItems.map((item) => (
                <SidebarLink key={item.title} link={item} />
              ))}
            </SidebarBody>
          </Sidebar>
        )}
        <LightAnimatedBackground>  {/* Changed from DarkAnimatedBackground */}
          <Container>
            <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mt: 4 }}>
              Course not found
            </Typography>
          </Container>
        </LightAnimatedBackground>
        {isMobile && (
          <FloatingDock
            items={navigationItems}
            mobileClassName="fixed bottom-4 right-4 z-50"
            desktopClassName="hidden" // Hide on desktop
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Only visible on desktop */}
      {!isMobile && (
        <Sidebar>
          <SidebarBody>
            {navigationItems.map((item) => (
              <SidebarLink key={item.title} link={item} />
            ))}
          </SidebarBody>
        </Sidebar>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 md:pb-4">
        <LightAnimatedBackground>
          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Remove the entire back button section and keep just the title */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h1" sx={{ color: '#1e293b', fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' } }}>
                {course.title}
              </Typography>
            </Box>

            {/* Video Player Section */}
            <Box sx={{ position: 'relative', mb: 6 }}>
              <Paper 
                ref={videoContainerRef}
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  aspectRatio: '16/9',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={course.videoUrl}
                  title={course.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </Paper>
            </Box>

            {/* Course Progress and Social Features */}
            <Box sx={{ mb: 4 }}>
              <Paper sx={{
                p: { xs: 2, sm: 3 },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#1e293b' }}>Course Progress</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title="Share Course">
                      <IconButton onClick={() => {}} sx={{ color: '#1e293b' }}>
                        <Share />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={liked ? 'Unlike' : 'Like'}>
                      <IconButton 
                        onClick={() => {
                          const newLiked = !liked;
                          setLiked(newLiked);
                          localStorage.setItem(`liked_${courseId}`, JSON.stringify(newLiked));
                        }} 
                        sx={{ color: '#1e293b' }}
                      >
                        {liked ? <ThumbUp /> : <ThumbUpOutlined />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#2196f3'
                    }
                  }} 
                />
                <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>{progress}% Completed</Typography>
              </Paper>
            </Box>

            {/* Course Materials */}
            <Box sx={{ mb: 4 }}>
              <Paper sx={{
                p: { xs: 2, sm: 3 },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <Typography variant="h6" sx={{ color: '#1e293b', mb: 2 }}>Course Materials</Typography>
                <List>
                  {materials.map((material, index) => (
                    <React.Fragment key={material.id}>
                      <ListItem 
                        sx={{ 
                          borderRadius: '8px',
                          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
                        }}
                      >
                        <ListItemIcon>
                          <Description sx={{ color: '#1e293b' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={material.name}
                          secondary={material.type}
                          sx={{ 
                            '& .MuiListItemText-primary': { color: '#1e293b' },
                            '& .MuiListItemText-secondary': { color: '#64748b' }
                          }}
                        />
                        <IconButton sx={{ color: '#1e293b' }}>
                          <Download />
                        </IconButton>
                      </ListItem>
                      {index < materials.length - 1 && <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>

            {/* Notes Section */}
            <Box sx={{ mb: 4 }}>
              <Paper sx={{
                p: { xs: 2, sm: 3 },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <NoteAdd sx={{ color: '#1e293b' }} />
                  <Typography variant="h6" sx={{ color: '#1e293b' }}>My Notes</Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Take notes..."
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      color: '#1e293b',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(0, 0, 0, 0.2)' },
                      '&.Mui-focused fieldset': { borderColor: '#2196f3' }
                    }
                  }}
                />
                
                <Button
                  variant="contained"
                  onClick={() => {
                    if (noteText.trim()) {
                      const newNote = {
                        id: Date.now(),
                        text: noteText,
                        timestamp: new Date().toISOString(),
                      };
                      const updatedNotes = [...notes, newNote];
                      setNotes(updatedNotes);
                      localStorage.setItem(`notes_${courseId}`, JSON.stringify(updatedNotes));
                      setNoteText('');
                    }
                  }}
                  sx={{
                    mb: 3,
                    backgroundColor: '#2196f3',
                    '&:hover': { 
                      backgroundColor: '#1976d2',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(33, 150, 243, 0.3)'
                    },
                    // Match Submit Question button styles
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }}
                >
                  Save Note
                </Button>
                <Stack spacing={2}>
                  {notes.map((note) => (
                    <Paper
                      key={note.id}
                      sx={{
                        p: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px'
                      }}
                    >
                      <Typography sx={{ color: '#1e293b' }}>{note.text}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                        {new Date(note.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Box>

            {/* Query Section */}
            <Paper elevation={0} sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              },
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#1e293b',
                  fontWeight: 600,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '1.25rem', md: '1.5rem' }
                }}
              >
                <span role="img" aria-label="question" style={{ fontSize: '1.5rem' }}>💭</span>
                Ask a Question
              </Typography>
              
              <form onSubmit={handleQuerySubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What's on your mind about this course?"
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      color: '#1e293b',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      padding: { xs: '12px', md: '16px' },
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        '& fieldset': {
                          borderColor: '#2196f3'
                        }
                      }
                    },
                    '& .MuiInputBase-input': {
                      '&::placeholder': {
                        color: '#64748b',
                        opacity: 1
                      }
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#2196f3',
                    borderRadius: '12px',
                    padding: { xs: '8px 16px', sm: '12px 24px' },
                    textTransform: 'none',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(33, 150, 243, 0.3)'
                    }
                  }}
                >
                  Submit Question
                </Button>
              </form>

              {/* Queries List */}
              <Box sx={{ mt: 5 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: '#1e293b',
                    fontWeight: 500,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <span role="img" aria-label="history" style={{ fontSize: '1.2rem' }}>📝</span>
                  Previous Questions
                </Typography>
                
                <Stack spacing={2}>
                  {queries.map((q, index) => (
                    <Paper
                      key={q.id}
                      elevation={0}
                      sx={{
                        p: 3,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                        '@keyframes fadeIn': {
                          from: { opacity: 0, transform: 'translateY(20px)' },
                          to: { opacity: 1, transform: 'translateY(0)' }
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          transform: 'translateX(8px)'
                        }
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: '#1e293b',
                          fontSize: '1rem',
                          lineHeight: 1.6
                        }}
                      >
                        {q.text}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#64748b',
                          display: 'block',
                          mt: 2,
                          fontSize: '0.85rem'
                        }}
                      >
                        {new Date(q.timestamp).toLocaleString()}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Container>
        </LightAnimatedBackground>
      </div>

      {/* Floating Dock - Only visible on mobile */}
      {isMobile && (
        <FloatingDock
          items={navigationItems}
          mobileClassName="fixed bottom-4 right-4 z-50"
          desktopClassName="hidden" // Hide on desktop
        />
      )}
    </div>
  );
};

export default CourseDetail;