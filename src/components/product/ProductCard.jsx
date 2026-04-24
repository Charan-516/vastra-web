import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  
  // Use a nice fallback image if missing
  const imageUrl = product.image || product.image_url || `https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default size 'M' for quick add. In real world, open a size selector modal or skip quick add for sized items.
    addToCart(product, 'M'); 
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block h-full flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover origin-bottom transition-transform duration-700 ease-out group-hover:scale-105" 
          loading="lazy"
        />
        
        {/* Badges */}
        {product.original_price && (
          <div className="absolute top-3 left-3 bg-[#e42529] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 z-10 rounded-full shadow-lg">
            {Math.round((1 - product.price/product.original_price)*100)}% Off
          </div>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-gray-500 hover:text-[#e42529] hover:bg-white hover:scale-110 transition-all z-10"
        >
          <Heart size={18} className={isWishlisted ? "fill-[#e42529] text-[#e42529]" : ""} />
        </button>
        
        {/* Quick Add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black/95 backdrop-blur-sm text-white py-3.5 text-xs tracking-widest font-semibold uppercase hover:bg-black transition-colors flex justify-center items-center gap-2 rounded-xl shadow-lg"
          >
            <ShoppingBag size={16} /> Quick Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-4 bg-white relative z-20">
        <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-2">{product.brand || 'Vastra Exclusive'}</p>
        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-1 leading-snug">{product.name}</h3>
        
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-bold text-base text-[#e42529]">₹{product.price}</span>
          {product.original_price && (
            <span className="text-gray-400 line-through text-xs font-medium">₹{product.original_price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
