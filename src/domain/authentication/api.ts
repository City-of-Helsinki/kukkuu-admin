import axios, { AxiosResponse } from 'axios';

const API_TOKEN_URL = process.env.REACT_APP_OIDC_AUTHORITY + '/api-tokens/';

export const fetchApiToken = async (accessToken: string) => {
  const response: AxiosResponse = await axios.post(
    API_TOKEN_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data[process.env.REACT_APP_KUKKUU_API_OIDC_SCOPE || ''];
};
