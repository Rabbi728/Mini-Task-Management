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
}

const useAuthStore = create<AuthState>((set) => ({
  user: { id: "", name: "", email: "", role: "" },
  fetchUser: async (token: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const userData = response.data
        set({ user: { id: userData.id, name: userData.name, email: userData.email, role: userData.role } });
        
        return {id: userData.id, name: userData.name, email: userData.email, role: userData.role};
    } catch (error) {
        return false;
    }
  },
}));

export default useAuthStore;