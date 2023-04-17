import axios from "axios";

function getNextcloudUrl(nextcloudUrl: string): string {
  return nextcloudUrl.endsWith("/") ? nextcloudUrl.slice(0, -1) : nextcloudUrl;
}

async function getFromNextcloud(
  nextcloudUrl: string,
  userID: string,
  fileUri: string
) {
  return await axios.get(
    `${getNextcloudUrl(
      nextcloudUrl
    )}/remote.php/dav/files/${userID}/${fileUri}`,
    {
      headers: {
        Authorization: "Bearer null",
      },
    }
  );
}

async function saveOnNextcloud(
  nextcloudUrl: string,
  userID: string,
  file: File,
  type: string
) {
  return await axios.put(
    `${getNextcloudUrl(nextcloudUrl)}/remote.php/dav/files/${userID}/${
      file.name
    }.${type}`,
    file,
    {
      headers: {
        Authorization: "Bearer null",
      },
    }
  );
}

export { getFromNextcloud, saveOnNextcloud };
