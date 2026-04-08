import axios from "axios";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User;
  fetchUser: (token: string) => Promise<User | null | boolean>;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: { id: "", name: "", email: "", role: "" },
  fetchUser: async (token: string) => {
    try {
        const isServer = typeof window === 'undefined';
        const baseUrl = isServer ? "http://api:5000" : process.env.NEXT_PUBLIC_API_URL;
        
        const response = await fetch(`${baseUrl}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const userData = await response.json();
        set({ user: { id: userData.id, name: userData.name, email: userData.email, role: userData.role } });
        
        return {id: userData.id, name: userData.name, email: userData.email, role: userData.role};
    } catch (error: any) {
        console.error("fetchUser error:", error);
        return false;
    }
  },
  clearUser: () => set({ user: { id: "", name: "", email: "", role: "" } }),
}));

export default useAuthStore;