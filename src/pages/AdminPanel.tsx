import { useState } from 'react';
import { Plus, DollarSign, Package, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { OrderCard } from '../components/OrderCard';
import { Button } from '../components/ui/Button';
import { ImageUpload } from '../components/ImageUpload';
import { ShareLink } from '../components/ShareLink';
import { Product } from '../types';

export function AdminPanel() {
  const { products, orders, addProduct, removeProduct } = useStore();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'pdv'>('products');

  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const preparingOrders = orders.filter((order) => order.status === 'preparing');
  const readyOrders = orders.filter((order) => order.status === 'ready');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image) {
      addProduct({
        id: Math.random().toString(36).substr(2, 9),
        ...newProduct as Product,
      });
      setNewProduct({});
      setShowAddProduct(false);
    }
  };

  const stats = [
    {
      label: 'Produtos',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Pedidos Pendentes',
      value: pendingOrders.length,
      icon: ShoppingBag,
      color: 'bg-yellow-500',
    },
    {
      label: 'Vendas do Dia',
      value: `R$ ${orders
        .filter(
          (order) =>
            new Date(order.createdAt).toDateString() ===
            new Date().toDateString()
        )
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Link do Cardápio</h2>
          <ShareLink />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800 p-6 rounded-lg flex items-center"
            >
              <div className={`${stat.color} p-4 rounded-lg mr-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'products' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('products')}
          >
            Produtos
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('orders')}
          >
            Pedidos
          </Button>
          <Button
            variant={activeTab === 'pdv' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('pdv')}
          >
            PDV
          </Button>
        </div>

        {/* Rest of the AdminPanel component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
}