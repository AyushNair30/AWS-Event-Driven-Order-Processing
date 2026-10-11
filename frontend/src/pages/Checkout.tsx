import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Lock, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder, generateCustomerId } from '@/services/api';
import OrderSummary from '@/components/OrderSummary';
import type { OrderResponse } from '@/types';

type PaymentMethod = 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery';

interface FormState {
  fullName: string;
  email: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

const paymentOptions: { value: PaymentMethod; label: string; icon: typeof Smartphone }[] = [
  { value: 'UPI', label: 'UPI', icon: Smartphone },
  { value: 'Credit/Debit Card', label: 'Credit/Debit Card', icon: CreditCard },
  { value: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
];

export default function Checkout() {
  const { items, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    paymentMethod: 'UPI',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (items.length === 0 && !submitting) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">
          Add some products before checking out.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={18} /> Browse Products
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.country.trim()) e.country = 'Country is required';
    if (!form.postalCode.trim()) e.postalCode = 'Postal code is required';
    else if (!/^\d{4,6}$/.test(form.postalCode))
      e.postalCode = 'Enter a valid postal code (4-6 digits)';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const response: OrderResponse = await createOrder({
        customerId: generateCustomerId(),
        customerName: form.fullName,
        customerEmail: form.email,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
        })),
        shippingAddress: {
          city: form.city,
          state: form.state,
          country: form.country,
          postalCode: form.postalCode,
        },
        paymentMethod: form.paymentMethod,
      });

      clearCart();
      navigate('/order-success', {
        state: {
          orderId: response.orderId,
          status: response.status,
          message: response.message,
          email: form.email,
          total: subtotal,
        },
      });
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/cart"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600"
      >
        <ArrowLeft size={16} /> Back to Cart
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form fields */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Info */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Customer Information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={inputClass('fullName')}
                  placeholder="John Doe"
                  disabled={submitting}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass('email')}
                  placeholder="john@example.com"
                  disabled={submitting}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={inputClass('city')}
                  placeholder="Chennai"
                  disabled={submitting}
                />
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className={inputClass('state')}
                  placeholder="Tamil Nadu"
                  disabled={submitting}
                />
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={inputClass('country')}
                  placeholder="India"
                  disabled={submitting}
                />
                {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  className={inputClass('postalCode')}
                  placeholder="600045"
                  disabled={submitting}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
            <p className="mt-1 text-xs text-gray-500">
              This is a demo. No real payment is processed.
            </p>
            <div className="mt-4 space-y-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    form.paymentMethod === opt.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  } ${submitting ? 'opacity-60' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={form.paymentMethod === opt.value}
                    onChange={(e) => handleChange('paymentMethod', e.target.value)}
                    className="h-4 w-4 accent-blue-600"
                    disabled={submitting}
                  />
                  <opt.icon size={20} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 space-y-4">
            <OrderSummary />
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Placing Order…
                </>
              ) : (
                <>
                  <Lock size={18} /> Place Order
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400">
              By placing your order, you agree to CloudCart's terms.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
