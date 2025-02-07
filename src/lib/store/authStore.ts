import { create } from "zustand";

interface AuthState {
  user: { name: string; email: string } | null;
  registerUser: (data: { name: string; email: string; password: string }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  registerUser: async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Registration failed");
        return false;
      }

      const user = await res.json();
      set({ user });
      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      return false;
    }
  },
}));
