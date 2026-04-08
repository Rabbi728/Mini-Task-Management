"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { fetchUser, user } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && (!user || !user.id)) {
      fetchUser(token);
    }
  }, [fetchUser, user, pathname]);

  return <>{children}</>;
}
