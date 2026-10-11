import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';

export default function Cart() {
  const { items, clearCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <ShoppingCart size={40} className="text-gray-400" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-gray-500">
          Looks like you haven't added anything yet. Explore our products and
          find something you love.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={16} /> Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <OrderSummary />
            <Link
              to="/checkout"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            <Link
              to="/products"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
