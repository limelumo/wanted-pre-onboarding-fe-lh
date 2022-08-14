import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useInput from '../hooks/useInput';

// 임시 유저 정보
const userInfo = {
  id: 'test1234@test.com',
  pw: '1234qwer',
};

const SignIn = () => {
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

  const idRef = useRef('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isValidId && isValidPw) setBtnActive(true);
    if (!isValidId || !isValidPw) setBtnActive(false);
    if (enteredId === '' || enteredPw === '') setBtnActive(false);
  }, [isValidId, isValidPw, enteredId, enteredPw]);

  const saveUserInfo = (id, pw, token) => {
    localStorage.setItem('id', id);
    localStorage.setItem('password', pw);
    localStorage.setItem('token', token);
  };

  const submitUserInfo = async () => {
    const response = await fetch('https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: enteredId, password: enteredPw }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();
    const token = responseData.access_token;

    saveUserInfo(enteredId, enteredPw, token);
    navigate('/todo');
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    if (userInfo.id !== enteredId || userInfo.pw !== enteredPw) {
      resetId();
      resetPw();
      idRef.current.focus();
      return;
    }
    submitUserInfo();
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <SignInWrapper>
      <SignInForm onSubmit={handleUserInfo}>
        <IdInput
          type="text"
          placeholder="e-mail"
          value={enteredId}
          onChange={handleIdChange}
          outLine={idInvalidClass}
          onBlur={handleIdBlur}
          ref={idRef}
        />

        <PwInput
          type="password"
          placeholder="password"
          value={enteredPw}
          onChange={handlePwChange}
          outLine={pwInvalidClass}
          onBlur={handlePwBlur}
        />

        <UserError>{error && '올바르지 않은 이메일 혹은 비밀번호입니다.'}</UserError>

        <SignInBtn disabled={!btnActive} color={btnActive ? btnActive.toString() : undefined}>
          Sign-in
        </SignInBtn>
      </SignInForm>

      <Divider />

      <SignUpSection>
        계정이 없으신가요?
        <button type="button" onClick={handleSignUp}>
          Sign-up
        </button>
      </SignUpSection>
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
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
  border: 1px solid #ccc;
  border-radius: 0.3em;
  padding: 0.8em 0 0.8em 0.5em;
  margin-bottom: 0.5em;

  &:focus {
    outline: none;
  }
`;

const IdInput = styled(Input)`
  border: 1px solid ${(prop) => (prop.outLine ? 'red' : '#dbdbdb')};
`;

const PwInput = styled(Input)`
  border: 1px solid ${(prop) => (prop.outLine ? 'red' : '#dbdbdb')};
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

export default SignIn;
