import { Link } from 'react-router-dom';
import { Cloud, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                <Cloud size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Cloud<span className="text-blue-600">Cart</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-500">
              Smart shopping, powered by the cloud. A modern e-commerce
              demonstration with a serverless, event-driven AWS backend.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/products" className="transition-colors hover:text-blue-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition-colors hover:text-blue-600">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="transition-colors hover:text-blue-600">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Connect</h4>
            <div className="mt-3 flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} CloudCart. A demonstration project.
          No real payments are processed.
        </div>
      </div>
    </footer>
  );
}
