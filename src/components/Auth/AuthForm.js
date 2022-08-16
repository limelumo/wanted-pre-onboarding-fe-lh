import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import useHttp from '../../hooks/useHttp';

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

  const { token, httpError, sendRequest: fetchTask } = useHttp();

  const [btnActive, setBtnActive] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

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

  const signInRequest = () => {
    if (userInfo.id !== enteredId || userInfo.pw !== enteredPw) {
      resetInput();
      return;
    }
    fetchTask(enteredId, enteredPw, 'signin', 'POST');
    navigate('/todo');
  };

  const signUpRequest = () => {
    fetchTask(enteredId, enteredPw, 'signup', 'POST');

    // 존재하는 아이디인 경우, token = undefined
    if (token === 'undefined') {
      resetInput();
      return;
    }

    console.log(typeof token);

    // 회원가입이 되었을 경우, alert 후 로그인 페이지 이동, token != undefined
    if (token !== 'undefined' || token !== null || token.trim().length > 0) {
      alert('정상적으로 가입되었습니다. 로그인 페이지로 이동합니다.');
      // navigate('/');
      return;
    }
  };

  const submitUserInfo = (e) => {
    e.preventDefault();
    if (currentPage !== 'sign-up') signInRequest();
    if (currentPage === 'sign-up') signUpRequest();
  };

  const handleSignUp = () => navigate('/sign-up');

  const signInError = currentPage !== 'sign-up' && error && '등록되지 않은 이메일 혹은 비밀번호 입니다.';
  const signUpError = currentPage === 'sign-up' && httpError === '동일한 이메일이 이미 존재합니다.' && httpError;

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
          <button type="button" onClick={handleSignUp}>
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
