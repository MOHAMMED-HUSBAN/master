export const decodeToken = (token) => {
  try {
    if (!token) return null;
    
    // فك تشفير التوكن
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  const decodedToken = decodeToken(token);
  return decodedToken?.user || null;
};

export const isAuthenticated = () => {
  const user = getUserFromToken();
  return !!user;
}; 