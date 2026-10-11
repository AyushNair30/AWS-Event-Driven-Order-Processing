import { useCart } from '@/context/CartContext';

interface OrderSummaryProps {
  compact?: boolean;
}

export default function OrderSummary({ compact = false }: OrderSummaryProps) {
  const { items, subtotal } = useCart();

  const shipping = subtotal > 0 ? (subtotal >= 2000 ? 0 : 99) : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className={`rounded-2xl border border-gray-100 bg-white ${compact ? 'p-4' : 'p-6'}`}>
      <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="font-medium text-green-600">Free</span>
            ) : (
              `₹${shipping}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes (5%)</span>
          <span>₹{tax.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {subtotal >= 2000 && subtotal > 0 && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
          You qualified for free shipping!
        </p>
      )}

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-blue-600">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {!compact && items.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-medium text-gray-700">{item.quantity}×</span>
              <span className="truncate">{item.product.name}</span>
              <span className="ml-auto">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
