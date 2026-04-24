import React, { useEffect, useState } from 'react';
import { getWishlist } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/product/ProductCard';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getWishlist(user.id).then(data => {
        setProducts(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 min-h-[60vh]">
        <h1 className="text-3xl font-display font-semibold text-gray-900 mb-10 border-b border-gray-200 pb-4">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(n => <div key={n} className="aspect-[3/4] skeleton rounded-md"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 min-h-[70vh] bg-background">
      
      <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-6">
        <Heart size={28} className="text-accent-red fill-current" />
        <h1 className="text-3xl font-display font-semibold text-gray-900">
          My Wishlist <span className="text-gray-400 font-normal ml-2">({products.length})</span>
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-md">
          <Heart size={48} className="text-gray-300 mb-4" strokeWidth={1} />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm text-center">Save items you love to your wishlist. Review them anytime and easily move them to your bag.</p>
          <a href="/shop" className="px-8 py-3 bg-black text-white font-semibold uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors shadow">
            Discover Fashion
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map(p => (
            <div key={p.id} className="relative group">
              {/* Product card handles the UI, but on wishlist we might want a cross/remove button top right. For now relying on standard card layout. */}
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
