import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [query, category, sort]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('featured');
    setSearchParams({});
  };

  const hasFilters = query.trim() || category !== 'All' || sort !== 'featured';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Products
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'} available
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-20">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Search
                  </label>
                  <SearchBar value={query} onChange={handleQueryChange} />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Category
                  </label>
                  <div className="space-y-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          category === cat
                            ? 'bg-blue-50 font-semibold text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Sort by
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                  </select>
                </div>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500"
                  >
                    <X size={15} /> Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="mb-4 lg:hidden">
            <SearchBar value={query} onChange={handleQueryChange} />
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
