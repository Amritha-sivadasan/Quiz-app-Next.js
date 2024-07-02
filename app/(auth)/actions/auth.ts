// utils/auth.ts

import { useRouter } from 'next/router';
import { fetchUsers } from './fetchUsers';

export const handleUserExistence = async (): Promise<boolean> => {
  try {
    const response = await fetchUsers();
    return !!response.data.user;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return false;
  }
};

export const redirectToHomeIfNoUser = async () => {
  const router = useRouter();
  const userExists = await handleUserExistence();
  if (!userExists) {
    router.push('/');
  }
};
