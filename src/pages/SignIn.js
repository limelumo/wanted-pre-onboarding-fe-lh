import styled from 'styled-components';

const SignIn = () => {
  const toLists = (e) => {
    e.preventDefault();
    alert('sign-in');
  };

  const handleSignUp = () => {
    alert('sign-up');
  };

  return (
    <SignInWrapper>
      <SignInForm onSubmit={toLists}>
        <input type="text" placeholder="e-mail" />
        <input type="password" placeholder="password" />

        <UserError>올바르지 않은 이메일 혹은 비밀번호입니다.</UserError>

        <SignInBtn>Sign-in</SignInBtn>
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
