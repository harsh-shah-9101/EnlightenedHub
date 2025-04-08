import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../components/DeleteButton.css';
import DarkAnimatedBackground from '../components/DarkAnimatedBackground';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
    setCourses(storedCourses);
  }, []);

  const handleDeleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    localStorage.setItem('myCourses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  return (
    <>
      {/* Add Video Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-black/30"
          style={{ mixBlendMode: 'multiply' }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/video-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source 
            src="/videos/vecteezy_abstract-grey-and-black-professional-motion-background_34700930.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Add Close Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="group fixed top-4 left-4 flex items-center justify-center relative z-50 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-[#999] outline-none focus-visible:outline-0 hover:border-white"
      >
        <svg
          fill="currentColor"
          stroke="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
          My Courses
        </Typography>
        
        {courses.length === 0 ? (
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            You haven't enrolled in any courses yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <Card sx={{ 
                  maxWidth: 280, 
                  height: '100%', 
                  margin: '15px 0px',
                  background: 'rgba(30, 30, 30, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg"
                    alt={course.title}
                    sx={{
                      objectFit: 'cover',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  />
                  <CardContent sx={{ 
                    p: 2,
                    '&:last-child': { pb: 2 }
                  }}>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: '#ffffff' }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9e9e9e', fontSize: '0.875rem' }}>
                      {course.category}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9e9e9e', fontSize: '0.875rem' }}>
                      Instructor: {course.instructor}
                    </Typography>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        sx={{ 
                          backgroundColor: '#2196f3',
                          borderRadius: '20px',
                          flexGrow: 1,
                          '&:hover': {
                            backgroundColor: '#1976d2'
                          }
                        }}
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        Continue Learning
                      </Button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <svg
                          viewBox="0 0 1.625 1.625"
                          className="delete-icon-top"
                          height="15"
                          width="15"
                        >
                          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                        </svg>
                        <svg
                          width="16"
                          fill="none"
                          viewBox="0 0 39 7"
                          className="delete-icon-middle"
                        >
                          <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                          <line stroke-width="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
                        </svg>
                        <svg width="16" fill="none" viewBox="0 0 33 39">
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                          <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                          <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MyCourses;