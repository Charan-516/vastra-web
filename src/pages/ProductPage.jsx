import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, toggleWishlist, getProducts } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductCard from '../components/product/ProductCard';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const sizes = product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 
    ? product.sizes 
    : ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    setLoading(true);
    getProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
      
      // Fetch related products
      if (data && data.category) {
        getProducts(data.category).then(related => {
          setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4));
        });
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to manage wishlist");
      return;
    }
    await toggleWishlist(user.id, product.id);
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[3/4] skeleton rounded-md"></div>
          <div className="space-y-6 pt-10">
            <div className="h-8 w-1/4 skeleton rounded"></div>
            <div className="h-12 w-3/4 skeleton rounded"></div>
            <div className="h-6 w-1/3 skeleton rounded"></div>
            <div className="h-32 w-full skeleton rounded mt-10"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-40">Product not found.</div>;

  const imageUrl = product.image || product.image_url || `https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800`;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 text-xs text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-black">Home</Link> / 
          <Link to={`/shop/${product.category}`} className="hover:text-black mx-1">{product.category}</Link> / 
          <span className="text-gray-800 ml-1 truncate inline-block align-bottom max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Images Section (Desktop Scroll, Mobile Snap) */}
          <div className="lg:col-span-7">
            {/* Desktop View */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full bg-[#f5f5f5] aspect-[3/4] overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={`${product.name} - View ${i}`} 
                    className="w-full h-full object-cover origin-bottom transition-transform duration-700 ease-out hover:scale-105" 
                  />
                </div>
              ))}
            </div>
            {/* Mobile View */}
            <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-[85vw] shrink-0 snap-center bg-[#f5f5f5] aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-2 py-1 text-xs font-semibold rounded">
                    {i}/3
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-24">
              <div className="mb-2 flex justify-between items-start">
                <p className="text-gray-500 font-semibold tracking-wider text-xs uppercase">{product.brand || 'Vastra Exclusive'}</p>
                <div className="flex items-center gap-1 text-xs font-semibold bg-gray-100 px-2 py-1 rounded">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" /> 
                  {product.rating || "4.8"}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-medium text-gray-900 mb-4 leading-snug">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-3 mb-8">
                <span className="text-2xl font-semibold text-gray-900">₹{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.original_price}</span>
                    <span className="text-red-600 text-sm font-semibold mb-1 ml-2">
                      ({Math.round((1 - product.price/product.original_price)*100)}% OFF)
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-500 mb-1 ml-auto">Inclusive of all taxes</span>
              </div>
              
              <hr className="border-gray-200 mb-8" />
              
              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-900">Select Size</span>
                  <button className="text-xs font-medium text-gray-500 underline underline-offset-2 hover:text-black">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {sizes.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setSelectedSize(s)} 
                      className={`py-3.5 border text-sm font-medium transition-all ${
                        selectedSize === s 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 text-gray-700 bg-white hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 mb-10">
                <button 
                  onClick={handleAddToCart} 
                  className="flex-1 bg-black text-white py-4 font-semibold uppercase tracking-wide flex justify-center items-center gap-2 hover:shadow-xl hover:bg-gray-900 transition-all"
                >
                  <ShoppingBag size={18} /> Add to Bag
                </button>
                <button 
                  onClick={handleWishlist} 
                  className={`px-6 py-4 flex items-center justify-center border transition-all ${
                    isWishlisted ? 'border-accent-red text-accent-red bg-red-50' : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-accent-red' : ''} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 border border-gray-200 rounded p-4 mb-10 bg-gray-50">
                <div className="text-center">
                  <Truck size={20} className="mx-auto mb-2 text-gray-600" />
                  <p className="text-[10px] font-semibold uppercase text-gray-600 tracking-wide">Free Shipping</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <RotateCcw size={20} className="mx-auto mb-2 text-gray-600" />
                  <p className="text-[10px] font-semibold uppercase text-gray-600 tracking-wide">14-Day Returns</p>
                </div>
                <div className="text-center">
                  <ShieldCheck size={20} className="mx-auto mb-2 text-gray-600" />
                  <p className="text-[10px] font-semibold uppercase text-gray-600 tracking-wide">100% Authentic</p>
                </div>
              </div>
              
              {/* Product Details Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-display font-semibold uppercase tracking-wide text-gray-900 mb-4 text-sm">Product Description</h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                  <p>{product.description || "Designed with immaculate detailing, this piece combines structural elegance with modern comfort. Crafted from premium fabrics, it offers a flawless silhouette suitable for any sophisticated wardrobe."}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Premium blended fabric for ultimate comfort</li>
                    <li>Tailored for a perfect modern fit</li>
                    <li>Dry clean recommended for longevity</li>
                  </ul>
                  <p className="text-xs font-medium text-gray-400 mt-4 uppercase tracking-widest">Product ID: {product.id.substring(0,8)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl font-semibold mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
