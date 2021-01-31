import React, {
  FC,
  FormEvent,
  FormHTMLAttributes,
  useCallback,
  useRef,
} from 'react';

import { Extend } from '../typings';
import '../styles/components/UsernameForm.css';

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
      <input ref={usernameInputRef} type="text" />
    </form>
  );
};

export default UsernameForm;
