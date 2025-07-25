import { useState } from 'react';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

const AuthModal = ({ onClose, initialView = 'signin' }) => {
  const [currentView, setCurrentView] = useState(initialView);

  const switchToSignIn = () => {
    setCurrentView('signin');
  };

  const switchToCreateAccount = () => {
    setCurrentView('createaccount');
  };

  return (
    <>
      {currentView === 'signin' ? (
        <SignIn 
          onClose={onClose} 
          onSwitchToCreateAccount={switchToCreateAccount}
        />
      ) : (
        <CreateAccount 
          onClose={onClose} 
          onSwitchToSignIn={switchToSignIn}
        />
      )}
    </>
  );
};

export default AuthModal;