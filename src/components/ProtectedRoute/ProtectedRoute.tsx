import { Navigate } from 'react-router-dom';

import { isPinUnlocked, isSignedIn } from '../../utils/auth';

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  if (!isSignedIn()) {
    return <Navigate to='/signin' replace />;
  }

  if (!isPinUnlocked()) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
