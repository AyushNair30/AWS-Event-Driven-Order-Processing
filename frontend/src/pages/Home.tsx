import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Cloud,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

const features = [
  {
    icon: Zap,
    title: 'Fast Shopping Experience',
    desc: 'Browse, search, and filter products instantly with a smooth, responsive interface.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    desc: 'A clean checkout flow with validated forms and protected order submission.',
  },
  {
    icon: Cloud,
    title: 'Cloud-Powered Processing',
    desc: 'Orders are sent to an AWS API Gateway and processed through a serverless pipeline.',
  },
  {
    icon: RefreshCw,
    title: 'Asynchronous Order Handling',
    desc: 'Orders are queued via Amazon SQS and processed reliably by Lambda functions.',
  },
];

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm">
              <Sparkles size={15} />
              Powered by serverless AWS architecture
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Cloud<span className="text-blue-600">Cart</span>
            </h1>
            <p className="mt-4 text-xl font-medium text-gray-700 sm:text-2xl">
              Smart shopping, powered by the cloud.
            </p>
            <p className="mt-4 text-base text-gray-500 sm:text-lg">
              CloudCart is a modern e-commerce experience built on a
              serverless, event-driven backend. Discover great products and
              enjoy a seamless, reliable checkout flow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                Shop Now
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Handpicked items our customers love
            </p>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:inline-flex"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Why CloudCart */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Why CloudCart is different
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500">
              A demonstration of modern e-commerce powered by cloud-native
              architecture.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <f.icon size={24} />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
