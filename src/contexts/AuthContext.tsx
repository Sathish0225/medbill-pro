import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    role: User["role"]
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@hospital.com",
    name: "Dr. Sarah Johnson",
    role: "admin",
    department: "Administration",
    phone: "+1-555-0101",
  },
  {
    id: "2",
    email: "receptionist@hospital.com",
    name: "Emily Davis",
    role: "receptionist",
    department: "Front Desk",
    phone: "+1-555-0102",
  },
  {
    id: "3",
    email: "billing@hospital.com",
    name: "Michael Chen",
    role: "billing_clerk",
    department: "Billing",
    phone: "+1-555-0103",
  },
  {
    id: "4",
    email: "doctor@hospital.com",
    name: "Dr. James Wilson",
    role: "doctor",
    department: "Cardiology",
    phone: "+1-555-0104",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("hospital_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: User["role"]
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.role === role
    );

    if (foundUser && password === "password123") {
      setUser(foundUser);
      localStorage.setItem("hospital_user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hospital_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
