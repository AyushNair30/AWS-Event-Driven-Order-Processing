import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import StarRating from '@/components/StarRating';
import ProductGrid from '@/components/ProductGrid';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-500">
          The product you're looking for doesn't exist.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={18} /> Back to Products
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <ChevronRight size={14} />
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {product.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={product.rating} size={18} />
            <span className="text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <p className="mt-5 text-base leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-5">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <Check size={16} /> In stock
                {product.stock < 10 && ` (only ${product.stock} left)`}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                Out of stock
              </span>
            )}
          </div>

          {/* Quantity & Add */}
          {product.stock > 0 && (
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all ${
                  added
                    ? 'bg-green-600 shadow-green-600/20'
                    : 'bg-blue-600 shadow-blue-600/20 hover:bg-blue-700'
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-900">Why shop with CloudCart?</p>
            <ul className="mt-2 space-y-1">
              <li>• Fast, reliable order processing</li>
              <li>• Cloud-powered backend architecture</li>
              <li>• Secure checkout flow</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            You might also like
          </h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  );
}
