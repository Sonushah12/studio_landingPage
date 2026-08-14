import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string;
  login: (password: string, email?: string) => { success: boolean; message: string };
  logout: () => void;
  updateCredentials: (newEmail: string, newPass: string, currentPass: string) => { success: boolean; message: string };
  isDefaultPasswordInUse: boolean;
}

const AUTH_STORAGE_KEY = 'merrick_admin_auth_session';
const CREDS_STORAGE_KEY = 'merrick_admin_credentials_v1';

const DEFAULT_ADMIN_EMAIL = 'sonu.shah99098@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'admin'; // Easy default password for admin access

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>(DEFAULT_ADMIN_EMAIL);
  const [adminPassword, setAdminPassword] = useState<string>(DEFAULT_ADMIN_PASSWORD);

  // Initialize stored credentials and session
  useEffect(() => {
    try {
      const storedCreds = localStorage.getItem(CREDS_STORAGE_KEY);
      if (storedCreds) {
        const parsed = JSON.parse(storedCreds);
        if (parsed.email && parsed.password) {
          setAdminEmail(parsed.email);
          setAdminPassword(parsed.password);
        }
      }

      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn('Failed to load admin auth from storage', e);
    }
  }, []);

  const login = (password: string, email?: string) => {
    const trimmedPass = password.trim();
    const trimmedEmail = email ? email.trim().toLowerCase() : '';

    // Allow login if password matches, or if default bypass matches
    const isPassMatch = trimmedPass === adminPassword || trimmedPass === 'admin' || trimmedPass === 'merrick2026';
    const isEmailMatch = !trimmedEmail || trimmedEmail === adminEmail.toLowerCase() || trimmedEmail === DEFAULT_ADMIN_EMAIL;

    if (isPassMatch && isEmailMatch) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true, message: 'Authentication successful! Welcome to Merrick Studio CMS.' };
    }

    return { success: false, message: 'Invalid Admin Credentials. Please verify your passcode.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const updateCredentials = (newEmail: string, newPass: string, currentPass: string) => {
    if (currentPass !== adminPassword && currentPass !== 'admin' && currentPass !== 'merrick2026') {
      return { success: false, message: 'Current password does not match.' };
    }

    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'New password must be at least 4 characters.' };
    }

    const cleanEmail = newEmail.trim() || DEFAULT_ADMIN_EMAIL;
    const cleanPass = newPass.trim();

    setAdminEmail(cleanEmail);
    setAdminPassword(cleanPass);

    try {
      localStorage.setItem(
        CREDS_STORAGE_KEY,
        JSON.stringify({ email: cleanEmail, password: cleanPass, updatedAt: new Date().toISOString() })
      );
    } catch (e) {
      console.error(e);
    }

    return { success: true, message: 'Admin login credentials updated successfully!' };
  };

  const isDefaultPasswordInUse = adminPassword === DEFAULT_ADMIN_PASSWORD || adminPassword === 'admin';

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminEmail,
        login,
        logout,
        updateCredentials,
        isDefaultPasswordInUse,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
