export const getValidStoredAccessToken = (): string | null => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  
  try {
    // Basic validation - you can enhance this based on your token format
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    
    if (payload.exp && payload.exp < now) {
      localStorage.removeItem("access_token");
      return null;
    }
    
    return token;
  } catch {
    localStorage.removeItem("access_token");
    return null;
  }
};

export const normalizeAccessToken = (token: string): string | null => {
  if (!token || typeof token !== "string") return null;
  
  // Remove Bearer prefix if present
  const cleanToken = token.replace(/^Bearer\s+/, "");
  
  // Basic format validation
  if (!cleanToken.includes(".")) return null;
  
  return cleanToken;
};
