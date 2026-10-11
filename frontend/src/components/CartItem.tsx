import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4">
      <Link
        to={`/product/${product.id}`}
        className="shrink-0 overflow-hidden rounded-xl bg-gray-50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-24 w-24 object-cover sm:h-28 sm:w-28"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/product/${product.id}`}
              className="font-semibold text-gray-900 transition-colors hover:text-blue-600"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-gray-500">{product.category}</p>
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label={`Remove ${product.name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-1 rounded-lg border border-gray-200">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>
          <span className="font-bold text-gray-900">
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
