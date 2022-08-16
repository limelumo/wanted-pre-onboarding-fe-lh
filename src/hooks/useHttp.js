import { useState } from 'react';

const useHttp = () => {
  const [httpError, setHttpError] = useState(null);
  const [token, setToken] = useState('');

  const baseUrl = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/';

  const sendRequest = async (id, pw, type, method) => {
    const response = await fetch(`${baseUrl}${type}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: id, password: pw }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      setHttpError(responseData.message);
    }

    localStorage.setItem('token', responseData.access_token);
    setToken(localStorage.getItem('token'));
  };

  return {
    token,
    httpError,
    sendRequest,
  };
};

export default useHttp;
