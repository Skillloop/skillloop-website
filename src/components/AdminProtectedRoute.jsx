import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  const role = user?.role || '';
  
  useEffect (() => {
    if(role === 'student'){
        navigate("/student/dashboard");
    }
  })

  // Check if user is logged in and has admin or superadmin role
  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  if (role !== 'admin' && role !== 'superadmin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
