import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  fullName: string;
  username: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => { success: boolean; error?: string };
  signup: (fullName: string, username: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

// Hardcoded users array
const USERS: StoredUser[] = [
  { fullName: 'Jyoshika', username: 'jyoshika', email: 'jyoshikajyoshika3@gmail.com', password: 'RideWise123' },
  { fullName: 'Demo User', username: 'demo', email: 'demo@ridewise.com', password: 'demo123' },
  { fullName: 'Admin', username: 'admin', email: 'admin@ridewise.com', password: 'admin123' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<StoredUser[]>(USERS);

  useEffect(() => {
    // Check for existing session
    const storedUser = sessionStorage.getItem('ridewise-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load any additional registered users
    const storedUsers = sessionStorage.getItem('ridewise-users');
    if (storedUsers) {
      setRegisteredUsers([...USERS, ...JSON.parse(storedUsers)]);
    }
  }, []);

  const login = (identifier: string, password: string) => {
    // Support login with username OR email
    const foundUser = registeredUsers.find(
      (u) => 
        (u.email.toLowerCase() === identifier.toLowerCase() || 
         u.username.toLowerCase() === identifier.toLowerCase()) && 
        u.password === password
    );

    if (foundUser) {
      const userData: User = { fullName: foundUser.fullName, username: foundUser.username, email: foundUser.email };
      setUser(userData);
      sessionStorage.setItem('ridewise-user', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (fullName: string, username: string, email: string, password: string) => {
    // Check if email already exists
    const existingEmail = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingEmail) {
      return { success: false, error: 'Email already registered' };
    }

    // Check if username already exists
    const existingUsername = registeredUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (existingUsername) {
      return { success: false, error: 'Username already taken' };
    }

    const newUser: StoredUser = { fullName, username, email, password };
    const newUsers = [...registeredUsers, newUser];
    setRegisteredUsers(newUsers);
    
    // Store new users (excluding default ones)
    const customUsers = newUsers.filter(u => !USERS.some(du => du.email === u.email));
    sessionStorage.setItem('ridewise-users', JSON.stringify(customUsers));
    
    // Do NOT auto-login - user must go back to login page
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('ridewise-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
