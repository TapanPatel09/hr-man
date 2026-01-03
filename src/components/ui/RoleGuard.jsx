import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RoleGuard = ({ 
  children, 
  requiredRole, 
  user, 
  redirectTo = '/sign-up-registration',
  fallback = null 
}) => {
  const location = useLocation();

  if (!user || !user?.role) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    if (fallback) {
      return fallback;
    }
    
    const defaultRedirect = user?.role === 'admin' ? '/admin-hr-dashboard' : '/employee-dashboard';
    return <Navigate to={defaultRedirect} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;