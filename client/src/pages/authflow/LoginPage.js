import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context';
import styled from 'styled-components';

const PageContainer = styled.div`
  margin: 20px;
`;

const LoginErrorMessage = styled.p`
  color: #dc3545;
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
`;

const LoginContainer = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  max-width: 846px;
  margin: auto;
  border-radius: 15px;
`;

const LoginHeader = styled.h1`
  color: black;
  font-size: 56px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const FitCheckSpan = styled.span`
  color: #d7552c;
`;

const LoginInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d6d0d0;
  font-size: 16px;
`;

const LoginButton = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #d7552c;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  text-align: center;
  transition: 0.2s ease;

  :hover {
    background-color: #9a4023;
    transition: 0.2s ease;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  border: none;
`;

const NoAccount = styled.p`
  color: #9e9189;
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
`;
const CreateAccountLink = styled.a`
  color: #d7552c;
`;

function LoginPage() {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [authError, setAuthError] = useState(undefined);

  async function handleSubmit({ email, password }, actions) {
    console.log(email);
    console.log(password);
    try {
      await auth.login(email, password);
    } catch (error) {
      console.log(error);
      const message =
        error.response.status === 400
          ? error.response.data.message
          : 'An unknown error occurred.';

      setAuthError(message);
    }
  }

  

  return (
    <PageContainer>
      <LoginHeader>
        Welcome to <FitCheckSpan>StudyHall</FitCheckSpan>!
      </LoginHeader>
      <LoginContainer>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({ email, password });
          }}
          method="POST"
        >
          <LoginInput
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></LoginInput>
          <LoginInput
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></LoginInput>

          {authError && <LoginErrorMessage> {authError} </LoginErrorMessage>}

          <LoginButton type="submit" value="Log In"></LoginButton>
          <NoAccount>
            Don't have an account? Create one{' '}
            <CreateAccountLink href="/register">here</CreateAccountLink>
          </NoAccount>
        </form>
      </LoginContainer>
    </PageContainer>
  );
}

export default LoginPage;
