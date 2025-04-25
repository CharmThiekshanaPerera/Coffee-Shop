import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = 'coffee_shop_cart';

export const CartService = {
  // Get all cart items
  async getCartItems(): Promise<any[]> {
    try {
      const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (!cartJson) return [];
      
      return JSON.parse(cartJson);
    } catch (error) {
      console.error('Get cart error:', error);
      return [];
    }
  },
  
  // Add item to cart
  async addToCart(product: any): Promise<void> {
    try {
      const cartItems = await this.getCartItems();
      
      // Check if product already exists in cart
      const existingItemIndex = cartItems.findIndex(
        item => item.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        cartItems[existingItemIndex].quantity += product.quantity || 1;
      } else {
        // Add new product to cart
        cartItems.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }
      
      // Save updated cart
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  },
  
  // Update item quantity
  async updateItemQuantity(productId: string, quantity: number): Promise<void> {
    try {
      const cartItems = await this.getCartItems();
      
      const updatedItems = cartItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  },
  
  // Remove item from cart
  async removeFromCart(productId: string): Promise<void> {
    try {
      const cartItems = await this.getCartItems();
      
      const updatedItems = cartItems.filter(item => item.id !== productId);
      
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Remove from cart error:', error);
    }
  },
  
  // Clear cart
  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  },
  
  // Get cart count
  async getCartCount(): Promise<number> {
    try {
      const cartItems = await this.getCartItems();
      
      return cartItems.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Get cart count error:', error);
      return 0;
    }
  },
};