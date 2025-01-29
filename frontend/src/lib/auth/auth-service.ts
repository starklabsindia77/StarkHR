import { users, User } from '../data';

export type { User as AuthUser };

export async function signIn(email: string, password: string): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
}

export async function signOut(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
}