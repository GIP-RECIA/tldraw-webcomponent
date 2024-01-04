import oidc from '@uportal/open-id-connect';

let userInfoApiUrl: string;

const setUserInfoApiUrl = (url: string) => {
  userInfoApiUrl = url;
};

const getToken = async (): Promise<string> => {
  const { encoded } = await oidc({ userInfoApiUrl });

  return encoded;
};

export { setUserInfoApiUrl, getToken };
