/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { gitHubApi } from '../services/api';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
}

export interface User {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  htmlUrl: string;
}

interface IdleResponse {
  isLoading: false;
  user: null;
  error?: never;
}

interface LoadingResponse {
  isLoading: true;
  user: null;
  error?: never;
}

interface SuccessResponse {
  isLoading: false;
  user: User;
  error?: never;
}

interface ErrorResponse {
  isLoading: false;
  user: null;
  error: AxiosError;
}

type Response =
  | IdleResponse
  | LoadingResponse
  | SuccessResponse
  | ErrorResponse;

export function useGitHubUser(username: string): Response {
  const [response, setResponse] = useState<Response>({
    user: null,
    isLoading: false,
  });

  useEffect(() => {
    if (username === '') return;

    const updateResponseWithSuccessData = (
      gitHubResponse: AxiosResponse<GitHubUser>,
    ) => {
      const { data: gitHubUser } = gitHubResponse;

      setResponse({
        user: {
          username: gitHubUser.login,
          name: gitHubUser.name,
          bio: gitHubUser.bio,
          avatarUrl: gitHubUser.avatar_url,
          htmlUrl: gitHubUser.html_url,
        },
        isLoading: false,
      });
    };

    const handleRequestError = (error: AxiosError) => {
      setResponse({ user: null, isLoading: false, error });
    };

    setResponse({ user: null, isLoading: true });

    gitHubApi
      .get<GitHubUser>(`/users/${username}`)
      .then(updateResponseWithSuccessData)
      .catch(handleRequestError);
  }, [username]);

  return response;
}
