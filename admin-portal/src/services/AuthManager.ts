import { primaryApi } from "@/api/ApiClient";
import { TokenManager } from "@/api/TokenManager";
import { User } from "@/types/User";
import { getPayloadFromJWT } from "@/utils";

const isLoggedIn = async () => {
  return TokenManager.hasValid();
};

const login = async (token: string) => {
  try {
    const {sub } = await getPayloadFromJWT(token);
    await TokenManager.set({
      id:sub,
      accessToken: token,
      refreshToken: token,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
};

const logout = async () => {
  await TokenManager.remove();
};

const getLoggedUser = async (): Promise<User> => {
  return primaryApi.get<User>("/consumer/details");
};

const AuthManager = {
  login,
  logout,
  isLoggedIn,
  getLoggedUser,
};

export default AuthManager;
