import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storing data in AsyncStorage
const AUTH_USER_KEY = 'coffee_shop_auth_user';
const AUTH_TOKEN_KEY = 'coffee_shop_auth_token';

export const AuthService = {
  // Login user
  async login(email: string, password: string): Promise<boolean> {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just check against hardcoded values
      if (email === 'user@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
        };
        
        // Store user data and mock token
        await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'mock-jwt-token');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  // Register new user
  async signup(name: string, email: string, password: string): Promise<boolean> {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just store the user
      const user = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      // Store user data and mock token
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'mock-jwt-token');
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  },
  
  // Log out user
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_USER_KEY);
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  
  // Check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },
  
  // Get current user data
  async getCurrentUser(): Promise<any> {
    try {
      const userJson = await AsyncStorage.getItem(AUTH_USER_KEY);
      if (!userJson) return null;
      
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },
};