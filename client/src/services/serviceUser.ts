import oidc from "@uportal/open-id-connect";

async function getUserID(userApi: string): Promise<string> {
  if (!userApi.startsWith("http")) {
    return userApi.endsWith("/") ? userApi.slice(0, -1) : userApi;
  }
  const {
    decoded: { sub },
  } = await oidc({
    userInfoApiUrl: userApi,
  });

  if (sub.includes("guest")) throw new Error("guest");

  return sub;
}

async function getUserName(userApi: string | undefined): Promise<string> {
  if (!userApi || !userApi.startsWith("http")) return "Anonymous";
  try {
    const {
      decoded: { name },
    } = await oidc({
      userInfoApiUrl: userApi,
    });

    return name;
  } catch (ignore) {
    return "Anonymous";
  }
}

export { getUserID, getUserName };
