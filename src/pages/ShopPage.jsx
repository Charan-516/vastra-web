import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProducts } from '../lib/api';
import ProductCard from '../components/product/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const ShopPage = () => {
  const { category: urlCat } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState(urlCat || 'All');
  const [sortParam, setSortParam] = useState('new');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
  const categories = ['All', 'Men', 'Women', 'Kids', 'Beauty', 'Accessories', 'Home'];

  useEffect(() => {
    setActiveCategory(urlCat || 'All');
  }, [urlCat]);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    setSearchTerm(currentSearch);
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    getProducts(activeCategory === 'All' ? null : activeCategory).then(data => {
      let filtered = [...(data || [])];
      
      // Apply search string filter
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
          (p.name && p.name.toLowerCase().includes(lowerSearch)) || 
          (p.brand && p.brand.toLowerCase().includes(lowerSearch))
        );
      }

      // Apply price range filter
      if (priceRange === 'under1000') {
        filtered = filtered.filter(p => p.price < 1000);
      } else if (priceRange === '1000to2500') {
        filtered = filtered.filter(p => p.price >= 1000 && p.price <= 2500);
      } else if (priceRange === '2500to5000') {
        filtered = filtered.filter(p => p.price > 2500 && p.price <= 5000);
      } else if (priceRange === 'over5000') {
        filtered = filtered.filter(p => p.price > 5000);
      }

      // Sort
      if (sortParam === 'low') filtered.sort((a, b) => a.price - b.price);
      if (sortParam === 'high') filtered.sort((a, b) => b.price - a.price);
      
      setProducts(filtered);
      setLoading(false);
    });
  }, [activeCategory, sortParam, priceRange, searchTerm]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">
            Home <span className="mx-2">/</span> Shop {activeCategory !== 'All' ? <><span className="mx-2">/</span> {activeCategory}</> : ''}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-black tracking-tight">
              {searchTerm ? `Search: "${searchTerm}"` : (activeCategory === 'All' ? 'All Products' : `${activeCategory}'s Collection`)}
              <span className="text-gray-400 text-lg sm:text-2xl ml-3 font-medium">({loading ? '...' : products.length})</span>
            </h1>
            
            <div className="flex items-center gap-4 text-sm bg-white border border-gray-200 rounded-full px-5 py-2 shadow-sm">
              <label className="text-gray-400 hidden sm:block font-bold text-xs uppercase tracking-widest">Sort By:</label>
              <div className="relative flex items-center">
                <select 
                  value={sortParam} 
                  onChange={(e) => setSortParam(e.target.value)}
                  className="w-full appearance-none outline-none pr-6 bg-transparent text-black font-semibold cursor-pointer text-sm"
                >
                  <option value="new">New Arrivals</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-10 p-6 lg:p-0 bg-white lg:bg-transparent rounded-2xl border lg:border-none border-gray-100 shadow-sm lg:shadow-none">
              <div className="flex items-center gap-2 font-display font-bold text-lg mb-2">
                <SlidersHorizontal size={20} className="text-[#e42529]" /> Filters
              </div>
              
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-[11px] mb-5 uppercase tracking-widest text-[#e42529]">Categories</h3>
                <ul className="space-y-4">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm tracking-wide transition-all w-full text-left flex items-center ${
                          activeCategory === cat ? 'font-bold text-black pl-3 border-l-2 border-[#e42529]' : 'text-gray-500 hover:text-black font-medium pl-3 border-l-2 border-transparent'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mock Price Range Filter */}
              <div>
                <h3 className="font-bold text-[11px] mb-5 uppercase tracking-widest text-[#e42529]">Price Range</h3>
                <ul className="space-y-4 text-sm text-gray-500 font-medium">
                  <li className="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="radio" name="price" checked={priceRange === 'all'} onChange={() => setPriceRange('all')} className="accent-[#e42529] w-4 h-4 cursor-pointer" /> All Prices
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="radio" name="price" checked={priceRange === 'under1000'} onChange={() => setPriceRange('under1000')} className="accent-[#e42529] w-4 h-4 cursor-pointer" /> Under ₹1,000
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="radio" name="price" checked={priceRange === '1000to2500'} onChange={() => setPriceRange('1000to2500')} className="accent-[#e42529] w-4 h-4 cursor-pointer" /> ₹1,000 - ₹2,500
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="radio" name="price" checked={priceRange === '2500to5000'} onChange={() => setPriceRange('2500to5000')} className="accent-[#e42529] w-4 h-4 cursor-pointer" /> ₹2,500 - ₹5,000
                  </li>
                  <li className="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="radio" name="price" checked={priceRange === 'over5000'} onChange={() => setPriceRange('over5000')} className="accent-[#e42529] w-4 h-4 cursor-pointer" /> Over ₹5,000
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 pb-20">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[3/5] skeleton rounded-2xl"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-500 font-medium">Try adjusting your filters or search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
