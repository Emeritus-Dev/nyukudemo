export interface NyukuUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  memberId: string;
  tier: 'bronze' | 'silver' | 'gold';
  createdAt: string;
}

const USERS_STORAGE_KEY = 'nyuku_registered_users';
const ACTIVE_SESSION_KEY = 'nyuku_active_user';

export const getRegisteredUsers = (): NyukuUser[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getActiveUser = (): NyukuUser | null => {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const registerUser = (payload: {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}): { ok: true; user: NyukuUser } | { ok: false; error: string } => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const users = getRegisteredUsers();

  if (!payload.fullName.trim()) {
    return { ok: false, error: 'Please enter your full name.' };
  }
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (payload.password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }

  const alreadyExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
  if (alreadyExists) {
    return { ok: false, error: 'An account with this email already exists. Please sign in.' };
  }

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const newUser: NyukuUser = {
    id: `usr_${Date.now()}`,
    fullName: payload.fullName.trim(),
    email: normalizedEmail,
    password: payload.password,
    phone: payload.phone?.trim() || '061 520 8170',
    memberId: `NYK-${randomDigits}-ZA`,
    tier: 'gold',
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(newUser));

  return { ok: true, user: newUser };
};

export const loginUser = (
  email: string,
  password: string
): { ok: true; user: NyukuUser } | { ok: false; error: string } => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();

  const matchedUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!matchedUser) {
    return { ok: false, error: 'No Syndicate account found with that email. Please register first.' };
  }

  if (matchedUser.password !== password) {
    return { ok: false, error: 'Incorrect password. Please enter the exact password you registered with.' };
  }

  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(matchedUser));
  return { ok: true, user: matchedUser };
};

export const logoutUser = () => {
  localStorage.removeItem(ACTIVE_SESSION_KEY);
};