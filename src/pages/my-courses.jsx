import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DarkAnimatedBackground from '../components/DarkAnimatedBackground';
import '../components/DeleteButton.css';

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
    <DarkAnimatedBackground>
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
                  backgroundColor: '#1e1e1e',
                  color: '#ffffff'
                }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg"
                    alt={course.title}
                  />
                  <CardContent sx={{ p: 2 }}>
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
    </DarkAnimatedBackground>
  );
};

export default MyCourses;