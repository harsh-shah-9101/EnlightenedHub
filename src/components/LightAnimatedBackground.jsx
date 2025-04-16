import React from 'react';
import { Box } from '@mui/material';

const LightAnimatedBackground = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 25%), radial-gradient(circle at 70% 60%, rgba(200, 220, 255, 0.5) 0%, rgba(200, 220, 255, 0) 25%)',
          animation: 'pulse 15s infinite alternate',
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.8 },
          '100%': { opacity: 1 }
        }
      }}
    >
      {children}
    </Box>
  );
};

export default LightAnimatedBackground;