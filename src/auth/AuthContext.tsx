import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = { name: string; email: string };
type StoredUser = User & { password: string };

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "ama_registered_users";
const SESSION_KEY = "ama_current_user";

function getRegisteredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const signup: AuthContextValue["signup"] = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists. Please log in instead." };
    }

    const newUser: StoredUser = { name: name.trim(), email: normalizedEmail, password };
    saveRegisteredUsers([...users, newUser]);

    const sessionUser: User = { name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { ok: true };
  };

  const login: AuthContextValue["login"] = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const match = users.find((u) => u.email === normalizedEmail);

    if (!match) {
      return { ok: false, error: "This email isn't registered yet. Please sign up first, then log in." };
    }
    if (match.password !== password) {
      return { ok: false, error: "Incorrect password." };
    }

    const sessionUser: User = { name: match.name, email: match.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}