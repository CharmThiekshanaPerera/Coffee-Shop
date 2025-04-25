import { mockProducts, mockReviews } from '@/data/mockData';

export const ProductService = {
  // Get all products
  async getAllProducts(): Promise<any[]> {
    // In a real app, this would be an API call
    return mockProducts;
  },
  
  // Get featured products
  async getFeaturedProducts(): Promise<any[]> {
    // Filter products that are featured
    return mockProducts.filter(product => product.featured);
  },
  
  // Get popular products
  async getPopularProducts(): Promise<any[]> {
    // Filter and sort by popularity (using rating as a proxy)
    return [...mockProducts]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  },
  
  // Get product by ID
  async getProductById(id: string): Promise<any> {
    // Find product by ID
    return mockProducts.find(product => product.id === id);
  },
  
  // Get products by category
  async getProductsByCategory(categoryId: string): Promise<any[]> {
    // Filter products by category
    return mockProducts.filter(product => product.categoryId === categoryId);
  },
  
  // Search products
  async searchProducts(query: string): Promise<any[]> {
    // Filter products by name or description containing the query
    const lowercaseQuery = query.toLowerCase();
    return mockProducts.filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  },
  
  // Get product reviews
  async getProductReviews(productId: string): Promise<any[]> {
    // Filter reviews by product ID
    return mockReviews.filter(review => review.productId === productId);
  },
};