export const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp < currentTime + 60;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const clearUserSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("info");
  }
};

export const isUserAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return false;

  try {
    const parsedUserInfo = JSON.parse(userInfo);
    const token = parsedUserInfo?.token;

    if (!token) return false;

    if (isTokenExpired(token)) {
      clearUserSession();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    clearUserSession();
    return false;
  }
};
