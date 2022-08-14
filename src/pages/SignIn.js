import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

// 임시 유저 정보
const userInfo = {
  id: 'test1234@test.com',
  pw: '1234qwer',
};

const SignIn = () => {
  const navigate = useNavigate();

  const [enteredId, setEnteredId] = useState('');
  const [enteredPw, setEnteredPw] = useState('');

  const [isValidId, setIsValidId] = useState(false);
  const [isValidPw, setIsValidPw] = useState(false);

  const [isIdTouched, setIsIdTouched] = useState(false);
  const [isPwTouched, setIsPwTouched] = useState(false);

  const [btnActive, setSignInBtnActive] = useState(false);

  const [error, setError] = useState(false);

  const idRef = useRef('');

  const idInvalidClass = !isValidId && isIdTouched;
  const pwInvalidClass = !isValidPw && isPwTouched;

  useEffect(() => {
    if (isValidId && isValidPw) {
      setSignInBtnActive(true);
    } else {
      setSignInBtnActive(false);
    }

    if (enteredId.trim() === '') setIsValidId(false);
    if (enteredPw.trim() === '') setIsValidPw(false);
    if (enteredId || enteredPw) setError(false);
  }, [isValidId, isValidPw, enteredId, enteredPw]);

  const handleIdChange = (e) => {
    setEnteredId(e.target.value);
    if (e.target.value.includes('@')) setIsValidId(true);
  };

  const handlePwChange = (e) => {
    setEnteredPw(e.target.value);
    if (e.target.value.length >= 8) setIsValidPw(true);
  };

  const handleIdBlur = () => {
    setIsIdTouched(true);
  };

  const handlePwBlur = () => {
    setIsPwTouched(true);
  };

  const resetUerInfo = () => {
    setEnteredId('');
    setEnteredPw('');
    idRef.current.focus();
  };

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

    if (enteredId !== userInfo.id || enteredPw !== userInfo.pw) {
      setError(true);
      resetUerInfo();
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
          name="id"
          placeholder="e-mail"
          value={enteredId}
          onChange={handleIdChange}
          outLine={idInvalidClass}
          onBlur={handleIdBlur}
          ref={idRef}
        />

        <PwInput
          type="password"
          name="password"
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
