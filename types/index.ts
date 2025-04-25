export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  categoryName: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}