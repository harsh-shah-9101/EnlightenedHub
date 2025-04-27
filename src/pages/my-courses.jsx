import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../components/DeleteButton.css';
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
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

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
    // Modify YouTube URLs to disable tracking
    const modifiedCourses = storedCourses.map(course => {
      if (course.videoUrl && course.videoUrl.includes('youtube.com')) {
        const videoId = course.videoUrl.match(
          /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^?&]+)/
        );
        if (videoId) {
          course.videoUrl = `https://www.youtube-nocookie.com/embed/${videoId[1]}?modestbranding=1&rel=0`;
        }
      }
      return course;
    });
    setCourses(modifiedCourses);
  }, []);

  const handleDeleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    localStorage.setItem('myCourses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarBody>
          {sidebarItems.map((item) => (
            <SidebarLink key={item.title} link={item} />
          ))}
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-50">
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
              My Courses
            </Typography>
            
            {courses.length === 0 ? (
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      color: 'text.primary',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={course.pictureUrl}
                        alt={course.title}
                        sx={{
                          objectFit: 'cover',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                        }}
                      />
                      <CardContent sx={{ 
                        p: 2,
                        '&:last-child': { pb: 2 }
                      }}>
                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'text.primary' }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                          {course.category}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
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
        </div>
      </main>
    </div>
  );
};

export default MyCourses;