import axios from 'axios';

const getNextcloudUrl = (nextcloudUrl: string): string =>
  nextcloudUrl.endsWith('/') ? nextcloudUrl.slice(0, -1) : nextcloudUrl;

const getFromNextcloud = async (nextcloudUrl: string, userID: string, fileUri: string) =>
  await axios.get(`${getNextcloudUrl(nextcloudUrl)}/remote.php/dav/files/${userID}/${fileUri}`, {
    headers: {
      Authorization: 'Bearer null',
    },
  });

const saveOnNextcloud = async (nextcloudUrl: string, userID: string, file: File, type: string) =>
  await axios.put(`${getNextcloudUrl(nextcloudUrl)}/remote.php/dav/files/${userID}/${file.name}.${type}`, file, {
    headers: {
      Authorization: 'Bearer null',
    },
  });

export { getFromNextcloud, saveOnNextcloud };
