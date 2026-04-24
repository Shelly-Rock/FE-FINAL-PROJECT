import { useQuery } from "@tanstack/react-query";
import type { User } from "../AuthProvider";

const fetchProfile = async (token: string): Promise<User> => {
  const response = await fetch("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const useAuthProfile = (enabled: boolean, token: string | null) => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => {
      if (!token) throw new Error("No token provided");
      return fetchProfile(token);
    },
    enabled: enabled && !!token,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
