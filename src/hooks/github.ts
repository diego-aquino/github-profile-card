/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { gitHubApi } from '../services/api';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
}

export interface User {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  htmlUrl: string;
}

interface UseGitHubUserResponse {
  user: User | null;
  error: AxiosError | null;
  isLoading: boolean;
}

export function useGitHubUser(username: string): UseGitHubUserResponse {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (username === '') return;

    const updateResponseWithSuccessData = (
      gitHubResponse: AxiosResponse<GitHubUser>,
    ) => {
      const {
        login,
        name,
        bio,
        avatar_url: avatarUrl,
        html_url: htmlUrl,
      } = gitHubResponse.data;

      setUser({ username: login, name, bio, avatarUrl, htmlUrl });
    };

    const handleRequestError = (requestError: AxiosError) => {
      setError(requestError);
    };

    setUser(null);
    setError(null);

    gitHubApi
      .get<GitHubUser>(`/users/${username}`)
      .then(updateResponseWithSuccessData)
      .catch(handleRequestError);
  }, [username]);

  const response = useMemo<UseGitHubUserResponse>(
    () => ({
      user,
      error,
      isLoading: !!username && !user && !error,
    }),
    [username, user, error],
  );

  return response;
}
