import oidc, { type JWT } from '@uportal/open-id-connect';

let userInfoApiUrl: string;

const setUserInfoApiUrl = (url: string): void => {
  userInfoApiUrl = url;
};

const getToken = async (): Promise<{ encoded: string; decoded: JWT }> => {
  const { encoded, decoded } = await oidc({ userInfoApiUrl });

  return { encoded, decoded };
};

export { setUserInfoApiUrl, getToken };
