import * as React from 'react';
import cls from 'classnames';

import styles from './input.scss';
import { SearchIcon } from 'src/components/icons/search';
import useDebounce from './hooks';

export interface ICallbackObject {
  value: string;
}

const INPUT_DEBOUNCE = 300;
interface IInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
}

const Input: React.SFC<IInputProps> = ({
  value = '',
  placeholder,
  disabled,
  onChange,
  onEnter,
  className,
}) => {
  const [localValue, setValue] = React.useState<string>('');
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  useDebounce(
    () => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      onChange && onChange(localValue);
    },
    INPUT_DEBOUNCE,
    [localValue],
  );

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOnEnter(event);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) =>
    onEnter && onEnter(event.currentTarget.value);

  return (
    <div className={cls(className, styles.wrapper)}>
      <input
        className={styles.input}
        type="text"
        value={localValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onKeyPress={handleOnKeyPress}
      />
      <SearchIcon />
    </div>
  );
};

export default Input;
