/* eslint-disable camelcase */
import { useMemo } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';

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
  user?: User;
  error?: AxiosError;
  isLoading: boolean;
}

async function fetchGitHubUser(username: string): Promise<User> {
  const response = await gitHubApi.get<GitHubUser>(`/users/${username}`);

  const {
    login,
    name,
    bio,
    avatar_url: avatarUrl,
    html_url: htmlUrl,
  } = response.data;

  return { username: login, name, bio, avatarUrl, htmlUrl };
}

export function useGitHubUser(username: string): UseGitHubUserResponse {
  const { data: user, error } = useSWR<User, AxiosError>(
    username === '' ? null : username,
    fetchGitHubUser,
  );

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
