import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { OrderItem } from '../types';

export function Menu() {
  const { products, cart, removeFromCart, updateCartItemQuantity, submitOrder } =
    useStore();
  const [showCart, setShowCart] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerInfo.name && customerInfo.phone) {
      submitOrder(customerInfo.name, customerInfo.phone);
      setShowCart(false);
      setCustomerInfo({ name: '', phone: '' });
    }
  };

  const CartItem = ({ item }: { item: OrderItem }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="font-medium text-white">{item.product.name}</h4>
          <p className="text-gray-400">
            R$ {item.product.price.toFixed(2)} x {item.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            updateCartItemQuantity(item.product.id, Math.max(0, item.quantity - 1))
          }
        >
          -
        </Button>
        <span className="text-white">{item.quantity}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            updateCartItemQuantity(item.product.id, item.quantity + 1)
          }
        >
          +
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cardápio</h1>
          <Button
            onClick={() => setShowCart(true)}
            className="flex items-center gap-2"
          >
            <ShoppingCart />
            <span className="bg-orange-700 px-2 py-1 rounded-full text-sm">
              {cart.length}
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Seu Pedido</h2>
              <div className="max-h-96 overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              <div className="border-t border-gray-700 mt-4 pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                {cart.length > 0 && (
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 rounded-lg p-2"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Seu Telefone
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-gray-700 rounded-lg p-2"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Finalizar Pedido
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setShowCart(false)}
                      >
                        Continuar Comprando
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}