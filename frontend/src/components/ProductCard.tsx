import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import StarRating from '@/components/StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>

        <p className="mt-2 text-xs font-medium text-gray-400">
          {product.stock > 0 ? (
            <span className={product.stock < 10 ? 'text-amber-600' : 'text-green-600'}>
              {product.stock < 10 ? `Only ${product.stock} left` : 'In stock'}
            </span>
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
        </p>
      </div>
    </Link>
  );
}
