import { Product } from '../types';
import { Button } from './ui/Button';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export function ProductCard({ product, isAdmin, onEdit, onDelete }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-500 text-xl font-bold">
            R$ {product.price.toFixed(2)}
          </span>
          {isAdmin ? (
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(product)}
              >
                Editar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDelete?.(product.id)}
              >
                Excluir
              </Button>
            </div>
          ) : (
            <Button onClick={() => addToCart(product)}>
              Adicionar ao Carrinho
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}