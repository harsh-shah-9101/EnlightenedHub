import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, TextField, Button, Box, Slider, IconButton, Stack, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff, Fullscreen, ArrowBack, PlayCircleOutline, Download, Share, ThumbUp, ThumbUpOutlined, NoteAdd, Description } from '@mui/icons-material';
import DarkAnimatedBackground from '../components/DarkAnimatedBackground';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState([]);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [liked, setLiked] = useState(false);

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
      <DarkAnimatedBackground>
        <Container>
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mt: 4 }}>
            Course not found
          </Typography>
        </Container>
      </DarkAnimatedBackground>
    );
  }

  return (
    <DarkAnimatedBackground>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center relative z-10 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-[#999] outline-none focus-visible:outline-0 mr-4"
            style={{ backgroundColor: 'transparent' }}
          >
            <svg
              fill="currentColor"
              stroke="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
              style={{ color: 'white' }}
            >
              <path
                className="group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
                d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
              />
              <path
                className="group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
                d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
              />
              <path
                className="group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
                d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
              />
            </svg>
          </button>
          <Typography variant="h4" component="h1" sx={{ color: '#ffffff', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
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
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              borderRadius: '16px',
              aspectRatio: '16/9',
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
            p: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#ffffff' }}>Course Progress</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip title="Share Course">
                  <IconButton onClick={() => {}} sx={{ color: 'white' }}>
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
                    sx={{ color: 'white' }}
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
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#2196f3'
                }
              }} 
            />
            <Typography variant="body2" sx={{ color: '#ffffff', mt: 1 }}>{progress}% Completed</Typography>
          </Paper>
        </Box>



        {/* Course Materials */}
        <Box sx={{ mb: 4 }}>
          <Paper sx={{
            p: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          }}>
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>Course Materials</Typography>
            <List>
              {materials.map((material, index) => (
                <React.Fragment key={material.id}>
                  <ListItem 
                    sx={{ 
                      borderRadius: '8px',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                    }}
                  >
                    <ListItemIcon>
                      <Description sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={material.name}
                      secondary={material.type}
                      sx={{ 
                        '& .MuiListItemText-primary': { color: '#ffffff' },
                        '& .MuiListItemText-secondary': { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                    <IconButton sx={{ color: 'white' }}>
                      <Download />
                    </IconButton>
                  </ListItem>
                  {index < materials.length - 1 && <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Notes Section */}
        <Box sx={{ mb: 4 }}>
          <Paper sx={{
            p: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <NoteAdd sx={{ color: '#ffffff' }} />
              <Typography variant="h6" sx={{ color: '#ffffff' }}>My Notes</Typography>
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
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
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
                '&:hover': { backgroundColor: '#1976d2' }
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                >
                  <Typography sx={{ color: '#ffffff' }}>{note.text}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block' }}>
                    {new Date(note.timestamp).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Query Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)'
            },
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: '#ffffff',
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
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  padding: { xs: '12px', md: '16px' },
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& fieldset': {
                      borderColor: '#2196f3'
                    }
                  }
                },
                '& .MuiInputBase-input': {
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
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
                padding: '12px 24px',
                textTransform: 'none',
                fontSize: '1rem',
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
                color: '#ffffff',
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
                    backgroundColor: 'rgba(45, 45, 45, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(55, 55, 55, 0.6)',
                      transform: 'translateX(8px)'
                    }
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: '#ffffff',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}
                  >
                    {q.text}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.5)',
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
    </DarkAnimatedBackground>
  );
};

export default CourseDetail;