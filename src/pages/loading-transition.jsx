import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

const LoadingTransition = ({ targetPath = '/dashboard' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(targetPath);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, targetPath]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <Loader />
    </div>
  );
};

export default LoadingTransition;