import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiClient } from '../lib/api.js';

export type UserRole = 'PROFESSIONAL' | 'ORGANIZATION_ADMIN' | 'RECRUITER' | 'SUPER_ADMIN';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  profession?: string;
  organizationName?: string;
  specialization?: string;
  verificationStatus?: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  switchRolePersona: (roleKey: 'doctor' | 'recruiter' | 'admin' | 'nurse') => void;
}

const DEMO_PERSONAS: Record<string, AuthUser> = {
  doctor: {
    _id: 'user_doc_01',
    name: 'Dr. Ananya Rao',
    email: 'ananya.rao@medvance.demo',
    phone: '+91 94451 22345',
    role: 'PROFESSIONAL',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    profession: 'Doctor',
    specialization: 'Cardiology',
    verificationStatus: 'VERIFIED'
  },
  nurse: {
    _id: 'user_nurse_01',
    name: 'Priya Nair',
    email: 'priya.nair@medvance.demo',
    phone: '+91 97401 55678',
    role: 'PROFESSIONAL',
    avatar: 'https://images.unsplash.com/photo-1594824813591-13723383a54b?w=200&auto=format&fit=crop&q=80',
    profession: 'Nurse',
    specialization: 'Critical Care / ICU',
    verificationStatus: 'VERIFIED'
  },
  recruiter: {
    _id: 'user_rec_01',
    name: 'NovaCare Talent Acquisition',
    email: 'careers@novacare.health',
    phone: '+91 40 4567 8900',
    role: 'ORGANIZATION_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=200&auto=format&fit=crop&q=80',
    organizationName: 'NovaCare Health Institute',
    verificationStatus: 'VERIFIED'
  },
  admin: {
    _id: 'user_admin_01',
    name: 'Dr. Rajesh Sharma (Super Admin)',
    email: 'admin@medvance.ai',
    phone: '+91 98765 43210',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('medvance_current_user');
    return saved ? JSON.parse(saved) : DEMO_PERSONAS.doctor; // Start logged-in as verified Dr. Ananya Rao for instant exploration!
  });
  const [token, setToken] = useState<string | null>(() => ApiClient.getToken() || 'demo_mock_jwt_token');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('medvance_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('medvance_current_user');
    }
  }, [user]);

  const login = async (email: string, requestedRole: UserRole = 'PROFESSIONAL') => {
    setIsLoading(true);
    try {
      // Look for matched persona
      const found = Object.values(DEMO_PERSONAS).find(p => p.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setUser(found);
      } else {
        setUser({
          _id: `user_${Date.now()}`,
          name: email.split('@')[0],
          email,
          phone: '+91 98765 00000',
          role: requestedRole,
          verificationStatus: 'VERIFIED'
        });
      }
      ApiClient.setToken('jwt_token_' + Date.now());
      setToken('jwt_token_' + Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const newUser: AuthUser = {
        _id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role || 'PROFESSIONAL',
        profession: data.profession || 'Doctor',
        organizationName: data.organizationName,
        verificationStatus: 'PENDING'
      };
      setUser(newUser);
      ApiClient.setToken('jwt_token_' + Date.now());
      setToken('jwt_token_' + Date.now());
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    ApiClient.removeToken();
    localStorage.removeItem('medvance_current_user');
  };

  const switchRolePersona = (roleKey: 'doctor' | 'recruiter' | 'admin' | 'nurse') => {
    const persona = DEMO_PERSONAS[roleKey];
    if (persona) {
      setUser(persona);
      ApiClient.setToken('mock_token_' + roleKey);
      setToken('mock_token_' + roleKey);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchRolePersona
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
