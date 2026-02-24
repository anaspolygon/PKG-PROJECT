
import { TokenManager, TokenRefresher } from '@/api/TokenManager';
import { redirectToLogin } from './server-action-redirect';

export function withAuth<TArgs extends readonly unknown[], TReturn>(
  action: (...args: TArgs) => Promise<TReturn>,
  returnUrl: string = '/dashboard'
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    const isValidRefreshToken = await TokenManager.isValidRefreshToken(40);
    if (!isValidRefreshToken) {
      try {
        await TokenRefresher.refreshAccessToken();
      } catch (error) {

        return await redirectToLogin(returnUrl);
      }
    }

    return await action(...args);
  };
}
