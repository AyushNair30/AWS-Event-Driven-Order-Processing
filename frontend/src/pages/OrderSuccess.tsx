import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, ShoppingBag, ArrowRight, Clock } from 'lucide-react';

interface OrderSuccessState {
  orderId?: string;
  status?: string;
  message?: string;
  email?: string;
  total?: number;
}

export default function OrderSuccess() {
  const location = useLocation();
  const state = location.state as OrderSuccessState | null;

  if (!state?.orderId) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">No order found</h1>
        <p className="mt-2 text-gray-500">
          We couldn't find a recent order. Try placing a new one.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Browse Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Order placed successfully!
        </h1>
        <p className="mt-2 text-gray-500">
          Thank you for shopping with CloudCart. A confirmation
          {state.email && ` has been sent to ${state.email}`}.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-sm font-medium text-gray-500">Order ID</span>
            <span className="font-bold text-gray-900">{state.orderId}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
              <Clock size={14} /> {state.status ?? 'QUEUED'}
            </span>
          </div>
          {state.total !== undefined && (
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-sm font-medium text-gray-500">Order Total</span>
              <span className="font-bold text-gray-900">
                ₹{state.total.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-xl bg-blue-50 p-4">
          <div className="flex gap-3">
            <Package size={20} className="mt-0.5 shrink-0 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Your order has been received
              </p>
              <p className="mt-1 text-sm text-blue-700">
                It's been queued and is being processed asynchronously through
                our cloud-powered backend. You'll be notified once it ships.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Package size={18} /> View Products
        </Link>
      </div>
    </div>
  );
}
