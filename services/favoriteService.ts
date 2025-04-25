import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = 'coffee_shop_favorites';

export const FavoriteService = {
  // Get all favorites
  async getFavorites(): Promise<any[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!favoritesJson) return [];
      
      return JSON.parse(favoritesJson);
    } catch (error) {
      console.error('Get favorites error:', error);
      return [];
    }
  },
  
  // Check if a product is in favorites
  async isFavorite(productId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(item => item.id === productId);
    } catch (error) {
      console.error('Check favorite error:', error);
      return false;
    }
  },
  
  // Add product to favorites
  async addFavorite(product: any): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      
      // Check if product already exists in favorites
      if (!favorites.some(item => item.id === product.id)) {
        favorites.push(product);
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Add favorite error:', error);
    }
  },
  
  // Remove product from favorites
  async removeFavorite(productId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      
      const updatedFavorites = favorites.filter(item => item.id !== productId);
      
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Remove favorite error:', error);
    }
  },
};