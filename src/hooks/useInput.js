import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  const isInvalid = !isValid && isTouched;

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleChange = (e) => {
    setEnteredValue(e.target.value);

    if (validateValue(e.target.value)) setIsValid(true);
    if (e.target.value.trim() !== '') setError(false);
  };

  const resetValue = () => {
    setError(false);
    setIsValid(false);
    setEnteredValue('');
  };

  const showError = () => {
    setError(true);
    setIsValid(false);
    setEnteredValue('');
  };

  return {
    value: enteredValue,
    isValid,
    error,
    isInvalid,
    handleBlur,
    handleChange,
    resetValue,
    showError,
  };
};
export default useInput;
