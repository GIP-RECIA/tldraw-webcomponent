import oidc, { type JWT } from '@uportal/open-id-connect';

let userInfoApiUrl: string;

const setUserInfoApiUrl = (url: string): void => {
  userInfoApiUrl = url;
};

const getJwt = async (): Promise<{ encoded: string; decoded: JWT }> => {
  const { encoded, decoded } = await oidc({ userInfoApiUrl });

  return { encoded, decoded };
};

const parseJwt = (token: string): JWT => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export { setUserInfoApiUrl, getJwt, parseJwt };
