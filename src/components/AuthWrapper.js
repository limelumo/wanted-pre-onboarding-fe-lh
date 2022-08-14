import { Navigate } from 'react-router-dom';

const AuthWrapper = () => {
  const authenticated = !!localStorage.getItem('token');

  return <Navigate to={authenticated ? '/todo' : '/sign-in'} replace />;
};
export default AuthWrapper;
