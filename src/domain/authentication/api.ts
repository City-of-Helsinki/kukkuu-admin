import axios, { AxiosResponse } from 'axios';

const API_TOKEN_URL = process.env.REACT_APP_OIDC_AUTHORITY + '/api-tokens/';

export const fetchApiToken = async (accessToken: string) => {
  console.count('fetchApiToken');
  const response: AxiosResponse = await axios.post(
    API_TOKEN_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data['https://api.hel.fi/auth/kukkuu'];
};
