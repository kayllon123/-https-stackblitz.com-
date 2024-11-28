export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  total: number;
  customerName: string;
  customerPhone: string;
  createdAt: Date;
}