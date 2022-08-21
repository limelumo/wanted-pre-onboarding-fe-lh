import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import Header from '../components/UI/Header';
import useInput from '../hooks/useInput';
import { sendAuthRequest } from '../api/auth';

const AuthForm = () => {
  const {
    value: enteredId,
    isValid: isValidId,
    error,
    isInvalid: idInvalidClass,
    handleBlur: handleIdBlur,
    handleChange: handleIdChange,
    showError: showErrorId,
    resetValue: resetId,
  } = useInput((value) => value.includes('@'));

  const {
    value: enteredPw,
    isValid: isValidPw,
    isInvalid: pwInvalidClass,
    handleBlur: handlePwBlur,
    handleChange: handlePwChange,
    showError: showErrorPw,
    resetValue: resetPw,
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/todo');

    idRef.current.focus();
  }, [navigate]);

  const showInputError = () => {
    showErrorId();
    showErrorPw();
    idRef.current.focus();
  };

  const resetValue = () => {
    resetId();
    resetPw();
  };

  const moveToPage = (page) => {
    navigate(page);
    resetValue();
    setSignUpApiError('');
  };

  const moveToTodo = (token) => {
    localStorage.setItem('token', token);
    navigate('/todo', { raplace: true });
  };

  const signIn = async () => {
    const response = await sendAuthRequest(enteredId, enteredPw, 'signin');
    if (response.status === 200) moveToTodo(response.token);
    if (response.status === 404) showInputError();
  };

  const signUp = async () => {
    const response = await sendAuthRequest(enteredId, enteredPw, 'signup');

    if (response.status === 201) {
      alert('정상적으로 가입되었습니다. 로그인 화면으로 이동합니다.');
      moveToPage('/');
    } else {
      setSignUpApiError('동일한 이메일이 이미 존재합니다.');
      showInputError();
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
      {currentPage !== 'sign-up' ? <Header text={'Welcome back!'} /> : <Header text={'Sign Up'} />}

      <SignInForm onSubmit={submitUserInfo}>
        <Input
          type="text"
          placeholder="E-mail (@포함)"
          value={enteredId}
          onChange={handleIdChange}
          outLine={idInvalidClass}
          onBlur={handleIdBlur}
          ref={idRef}
        />

        <Input
          type="password"
          placeholder="Password (8자리 이상)"
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

      {currentPage !== 'sign-up' ? (
        <SignUpSection>
          계정이 없으신가요?
          <button type="button" onClick={() => moveToPage('/sign-up')}>
            Sign-up
          </button>
        </SignUpSection>
      ) : (
        <SignUpSection>
          로그인 화면으로 돌아가기
          <button type="button" onClick={() => moveToPage('/')}>
            Sign-in
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
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
`;

const SignInForm = styled.form`
  width: 24em;
  display: flex;
  flex-direction: column;
  font-size: 1.1em;
`;

const Input = styled.input`
  border: 1px solid ${(prop) => (prop.outLine ? 'salmon' : '#dbdbdb')};
  border-radius: 0.3em;
  padding: 0.8em 0 0.8em 0.5em;
  margin-bottom: 0.7em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SignInBtn = styled.button`
  background-color: ${(props) => (props.color ? 'salmon' : 'gray')};
  color: white;
  padding: 0.8em 0;
  border-radius: 0.3em;
  margin-top: 0.8em;
`;

const UserError = styled.p`
  color: salmon;
  text-align: center;
  font-weight: bold;
  margin: 1.5em 0;
`;

const SignUpSection = styled.section`
  margin-top: 1.6em;

  & button {
    color: salmon;
    font-weight: bold;
  }
`;

export default AuthForm;
