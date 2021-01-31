import React, {
  FC,
  FormEvent,
  FormHTMLAttributes,
  useCallback,
  useRef,
} from 'react';

import { Extend } from '../typings';
import '../styles/components/UsernameForm.css';
import SearchIcon from '../assets/SearchIcon';

type Props = Extend<
  FormHTMLAttributes<HTMLFormElement>,
  { onSubmit(username: string): void }
>;

const UsernameForm: FC<Props> = ({ onSubmit, ...rest }) => {
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const username = usernameInputRef.current?.value ?? '';
      onSubmit(username);
    },
    [onSubmit],
  );

  return (
    <form className="usernameForm" {...rest} onSubmit={handleSubmit}>
      <SearchIcon className="usernameForm__searchIcon" title="Search" />
      <input ref={usernameInputRef} type="text" />
    </form>
  );
};

export default UsernameForm;
