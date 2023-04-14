import axios from "axios";

const userID = "";

async function getFromNextcloud(nextcloudUrl: string, fileUri: string) {
  return await axios.get(
    `${nextcloudUrl}/remote.php/dav/files/${userID}/${fileUri}`,
    {
      headers: {
        Authorization: "Bearer null",
      },
    }
  );
}

async function saveOnNextcloud(nextcloudUrl: string, file: File, type: string) {
  return await axios.put(
    `${nextcloudUrl}/remote.php/dav/files/${userID}/${file.name}.${type}`,
    file,
    {
      headers: {
        Authorization: "Bearer null",
      },
    }
  );
}

export { getFromNextcloud, saveOnNextcloud };
