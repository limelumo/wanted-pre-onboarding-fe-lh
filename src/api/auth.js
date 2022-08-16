const baseUrl = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production';

export const sendAuthRequest = async (id, pw, type) => {
  try {
    const response = await fetch(`${baseUrl}/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: id, password: pw }),
    });
    const responseData = await response.json();
    const token = responseData.access_token;

    return { status: response.status, token };
  } catch (err) {
    return { status: err.response.data.statusCode, msg: err.response.data.message };
  }
};
