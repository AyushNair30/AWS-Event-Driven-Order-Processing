import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cloud, Home, Package, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <Cloud size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Cloud<span className="text-blue-600">Cart</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            <Home size={17} /> Home
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            <Package size={17} /> Products
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search…"
                className="w-48 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm transition-all focus:w-64 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                aria-label="Search products"
              />
            </div>
          </form>

          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
            aria-label={`Cart with ${totalItems} items`}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((m) => !m)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-t border-gray-100 px-4 py-3 lg:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                aria-label="Search products"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Home size={18} /> Home
          </Link>
          <Link
            to="/products"
            onClick={closeMobile}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Package size={18} /> Products
          </Link>
        </div>
      )}
    </header>
  );
}
