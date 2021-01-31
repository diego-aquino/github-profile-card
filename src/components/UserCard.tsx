import React, { FC } from 'react';

import { User } from '../hooks/github';

import GitHubLogo from '../assets/GitHubLogo';
import '../styles/components/UserCard.css';

interface Props {
  user: User;
}

const UserCard: FC<Props> = ({ user }) => (
  <div className="userCard">
    <div className="userCard__headingBackground" />
    <img
      className="userCard__avatarImage"
      src={user.avatarUrl}
      alt={user.name}
    />
    <div className="userCard__heading">
      <h1 className="userCard__name">{user.name}</h1>
      <a
        className="userCard__linkToGitHubProfile"
        href={user.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubLogo
          className="userCard__gitHubLogo"
          title={`Go to ${user.name}'s GitHub profile`}
        />
        {`Go to ${user.name}'s GitHub profile`}
      </a>
    </div>
    <p className="userCard__bio">{user.bio}</p>
  </div>
);

export default UserCard;
