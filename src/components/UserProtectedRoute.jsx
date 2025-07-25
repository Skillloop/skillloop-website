// AdminProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || '';

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role !== 'student') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StudentProtectedRoute;
