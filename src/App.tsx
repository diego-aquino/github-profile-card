import React, { FC, useCallback, useState } from 'react';

import { useGitHubUser } from './hooks/github';
import UserCard from './components/UserCard';

import './styles/App.css';
import UsernameForm from './components/UsernameForm';

const App: FC = () => {
  const [username, setUsername] = useState('');
  const { user, isLoading, error } = useGitHubUser(username);

  const handleUsernameFormSubmit = useCallback((searchUsername: string) => {
    setUsername(searchUsername);
  }, []);

  return (
    <div className="app">
      <UsernameForm onSubmit={handleUsernameFormSubmit} />
      <div className="app__userCardContainer">
        {isLoading && <p className="app__statusMessage">Loading...</p>}
        {error && <p className="app__statusMessage">User not found :(</p>}
        {user && <UserCard user={user} />}
      </div>
    </div>
  );
};

export default App;
