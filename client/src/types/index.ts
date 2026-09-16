export type ProductCategory = 'smartphones' | 'laptops' | 'smartwatches' | 'accessories';

export interface Product {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  isFeatured?: boolean;
  isNewProduct?: boolean;
  tag?: string;
  discountRate?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  image: string;
  count: number;
}
