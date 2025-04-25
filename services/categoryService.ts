import { mockCategories } from '@/data/mockData';

export const CategoryService = {
  // Get all categories
  async getCategories(): Promise<any[]> {
    // In a real app, this would be an API call
    return mockCategories;
  },
  
  // Get category by ID
  async getCategoryById(id: string): Promise<any> {
    // Find category by ID
    return mockCategories.find(category => category.id === id);
  },
};