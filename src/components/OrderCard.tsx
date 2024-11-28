import { Order } from '../types';
import { Button } from './ui/Button';
import { useStore } from '../store/useStore';

const statusMap = {
  pending: 'Pendente',
  preparing: 'Preparando',
  ready: 'Pronto',
  delivered: 'Entregue',
};

const statusColors = {
  pending: 'bg-yellow-500',
  preparing: 'bg-blue-500',
  ready: 'bg-green-500',
  delivered: 'bg-gray-500',
};

export function OrderCard({ order }: { order: Order }) {
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold">Pedido #{order.id}</h3>
          <p className="text-gray-400">
            {order.customerName} - {order.customerPhone}
          </p>
        </div>
        <span
          className={`${
            statusColors[order.status]
          } px-3 py-1 rounded-full text-sm font-medium text-white`}
        >
          {statusMap[order.status]}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between text-gray-300"
          >
            <span>
              {item.quantity}x {item.product.name}
            </span>
            <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-700 pt-2">
        <div className="flex justify-between text-white font-bold mb-4">
          <span>Total:</span>
          <span>R$ {order.total.toFixed(2)}</span>
        </div>
        
        {order.status !== 'delivered' && (
          <div className="flex gap-2">
            {order.status === 'pending' && (
              <Button
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                className="flex-1"
              >
                Iniciar Preparo
              </Button>
            )}
            {order.status === 'preparing' && (
              <Button
                onClick={() => updateOrderStatus(order.id, 'ready')}
                className="flex-1"
              >
                Marcar como Pronto
              </Button>
            )}
            {order.status === 'ready' && (
              <Button
                onClick={() => updateOrderStatus(order.id, 'delivered')}
                className="flex-1"
              >
                Marcar como Entregue
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}