import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { sendAuthRequest } from '../api/auth';

// 임시 유저 정보
const userInfo = {
  id: 'test1234@test.com',
  pw: '1234qwer',
};

const AuthForm = () => {
  const {
    value: enteredId,
    isValid: isValidId,
    error,
    isInvalid: idInvalidClass,
    handleBlur: handleIdBlur,
    handleChange: handleIdChange,
    reset: resetId,
  } = useInput((value) => value.includes('@'));

  const {
    value: enteredPw,
    isValid: isValidPw,
    isInvalid: pwInvalidClass,
    handleBlur: handlePwBlur,
    handleChange: handlePwChange,
    reset: resetPw,
  } = useInput((value) => value.length >= 8);

  const [btnActive, setBtnActive] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [signUpApiError, setSignUpApiError] = useState('');

  const idRef = useRef('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname.split('/')[1]);

    if (isValidId && isValidPw) setBtnActive(true);
    if (!isValidId || !isValidPw) setBtnActive(false);
    if (enteredId === '' || enteredPw === '') setBtnActive(false);
  }, [location, isValidId, isValidPw, enteredId, enteredPw]);

  const resetInput = () => {
    resetId();
    resetPw();
    idRef.current.focus();
  };

  const moveToTodo = (token) => {
    localStorage.setItem('token', token);
    navigate('/todo', { raplace: true });
  };

  const signIn = async () => {
    if (userInfo.id !== enteredId || userInfo.pw !== enteredPw) {
      resetInput();
      return;
    }

    const response = await sendAuthRequest(enteredId, enteredPw, 'signin');
    if (response.status === 200) moveToTodo(response.token);
  };

  const signUp = async () => {
    const response = await sendAuthRequest(enteredId, enteredPw, 'signup');

    if (response.status === 201) {
      moveToTodo(response.token);
    } else {
      setSignUpApiError('동일한 이메일이 이미 존재합니다.');
      resetInput();
    }
  };

  const submitUserInfo = (e) => {
    e.preventDefault();

    if (currentPage !== 'sign-up') signIn();
    if (currentPage === 'sign-up') signUp();
  };

  const signInError = currentPage !== 'sign-up' && error && '올바르지 않은 이메일 혹은 비밀번호 입니다.';
  const signUpError = currentPage === 'sign-up' && signUpApiError && signUpApiError;

  return (
    <SignInWrapper>
      <SignInForm onSubmit={submitUserInfo}>
        <Input
          type="text"
          placeholder="E-mail"
          value={enteredId}
          onChange={handleIdChange}
          outLine={idInvalidClass}
          onBlur={handleIdBlur}
          ref={idRef}
        />

        <Input
          type="password"
          placeholder="Password"
          value={enteredPw}
          onChange={handlePwChange}
          outLine={pwInvalidClass}
          onBlur={handlePwBlur}
        />

        <UserError>
          {signInError}
          {signUpError}
        </UserError>

        <SignInBtn type="submit" disabled={!btnActive} color={btnActive ? btnActive.toString() : undefined}>
          {currentPage !== 'sign-up' ? 'Sign-in' : 'Sign-up'}
        </SignInBtn>
      </SignInForm>

      {currentPage !== 'sign-up' && (
        <SignUpSection>
          <Divider />
          계정이 없으신가요?
          <button type="button" onClick={() => navigate('/sign-up')}>
            Sign-up
          </button>
        </SignUpSection>
      )}
    </SignInWrapper>
  );
};

const SignInWrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8em;
`;

const SignInForm = styled.form`
  width: 24em;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: #eee;
  border: 1px solid ${(prop) => (prop.outLine ? 'red' : '#dbdbdb')};
  border-radius: 0.3em;
  padding: 0.8em 0 0.8em 0.5em;
  margin-bottom: 0.5em;

  &:focus {
    outline: none;
  }
`;

const SignInBtn = styled.button`
  outline: none;
  border: none;
  background-color: ${(props) => (props.color ? 'salmon' : 'gray')};
  color: white;
  padding: 0.6em 0;
  border-radius: 0.3em;
  margin: 0.5em 0 1em 0;
`;

const UserError = styled.p`
  color: salmon;
  text-align: center;
  font-weight: bold;
  padding: 0.5em 0 1.5em;
`;

const Divider = styled.hr`
  margin: 1em 0 2em;
  width: 100%;
`;

const SignUpSection = styled.section`
  text-align: center;
  & button {
    border: none;
    outline: none;
    color: blue;
    background-color: transparent;
  }
`;

export default AuthForm;
