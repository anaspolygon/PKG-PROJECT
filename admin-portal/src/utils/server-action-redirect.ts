'use server';

import { redirect } from 'next/navigation';
import AuthManager from '@/services/AuthManager';

export async function redirectToLogin(returnUrl: string = '/dashboard'): Promise<never> {
  await AuthManager.logout();
  redirect(`/?returnUrl=${encodeURIComponent(returnUrl)}`);
}
