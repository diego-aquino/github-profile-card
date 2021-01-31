import React, { FC, FormEvent, useCallback, useRef, useState } from 'react';

import { useGitHubUser } from './hooks/github';
import UserCard from './components/UserCard';

import './styles/App.css';

const App: FC = () => {
  const [username, setUsername] = useState('');
  const { user, isLoading, error } = useGitHubUser(username);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const handleUsernameFormSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    const usernameToSearch = usernameInputRef.current?.value;
    if (!usernameToSearch) return;

    setUsername(usernameToSearch);
  }, []);

  return (
    <div className="app">
      <form className="app__usernameForm" onSubmit={handleUsernameFormSubmit}>
        <input ref={usernameInputRef} type="text" />
      </form>
      <div className="app__userCardContainer">
        {isLoading && <p className="app__statusMessage">Loading...</p>}
        {error && <p className="app__statusMessage">User not found :(</p>}
        {user && <UserCard user={user} />}
      </div>
    </div>
  );
};

export default App;
