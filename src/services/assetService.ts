import { instance as axios } from '../utils/axiosUtils.ts';

const saveAsset = (url: string, body: FormData) =>
  axios.post(url, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const deleteAsset = (url: string, id: string) => axios.delete(`${url}/${id}`);

export { saveAsset, deleteAsset };
