import { instance as axios } from '../utils/axiosUtils.ts';

const getFile = async (url: string) => await axios.get(url);

const saveFile = async (url: string, data: string) => await axios.put(url, { data });

export { getFile, saveFile };
