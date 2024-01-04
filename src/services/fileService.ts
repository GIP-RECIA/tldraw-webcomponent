import { getToken } from './userService';
import axios from 'axios';

const getFile = async (persistanceApiUrl: string) => {
  return await axios.get(persistanceApiUrl, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
};

const saveFile = async (persistanceApiUrl: string, blob: string) => {
  return await axios.put(
    persistanceApiUrl,
    { blob },
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  );
};

export { getFile, saveFile };
