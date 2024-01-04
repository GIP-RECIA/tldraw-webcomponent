import { instance as axios } from '../utils/axiosUtils.ts';

const getFile = async (url: string) => await axios.get(url);

const saveFile = async (url: string, blob: string) => await axios.put(url, { blob });

export { getFile, saveFile };
