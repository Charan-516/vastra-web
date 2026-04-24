import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../lib/api';
import ProductCard from '../components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      // Sort by some criteria or randomize. Taking first 8.
      setProducts(data.slice(0, 8));
      setLoading(false);
    });
  }, []);

  const categories = [
    { name: 'Men', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800' },
    { name: 'Women', img: 'https://images.unsplash.com/photo-1583391733958-d25974644ed9?auto=format&fit=crop&q=80&w=800' },
    { name: 'Kids', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800' },
    { name: 'Beauty', img: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner Carousel (Static for now) */}
      <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden bg-[#f4f4f4]">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Fashion Hero" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-start p-6 md:p-20 max-w-7xl mx-auto w-full">
          <div className="max-w-xl text-left">
            <h4 className="text-white font-semibold tracking-widest text-[10px] md:text-sm uppercase mb-3">Luxury Edit</h4>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">The Summer<br />Collection</h1>
            <p className="text-white/90 mb-10 max-w-sm text-sm md:text-lg leading-relaxed">Discover the new collection crafted with elegance and authenticity for the modern connoisseur.</p>
            <Link to="/shop" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors rounded-full transition-transform hover:scale-105">
              Shop The Edit
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="w-full bg-[#f4f4f4] py-8 overflow-hidden flex items-center">
        <div className="flex w-[200%] md:w-[150%] lg:w-[120%] animate-marquee hover-pause">
          {[1, 2].map((group) => (
            <div key={group} className="flex justify-around items-center w-full min-w-full gap-8 px-4 opacity-50 grayscale">
              <span className="font-display font-bold text-2xl tracking-widest text-black">ZARA</span>
              <span className="font-display font-bold text-xl tracking-widest text-black">MANGO</span>
              <span className="font-serif font-bold text-2xl tracking-widest text-black">TOM FORD</span>
              <span className="font-display font-medium text-lg tracking-[0.2em] text-black">ARMANI EXCHANGE</span>
              <span className="font-display font-bold text-xl tracking-widest text-black">RITU KUMAR</span>
              <span className="font-serif font-bold text-xl tracking-widest text-black">NALLI</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category - Circle Style like top e-com */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24">
        <h2 className="font-display text-3xl font-bold text-black mb-12 flex items-center gap-4">
          Explore Categories
          <div className="flex-1 h-px bg-gray-200 ml-4 hidden md:block"></div>
        </h2>
        <div className="flex overflow-x-auto gap-6 md:gap-10 pb-8 hide-scrollbar snap-x snap-mandatory">
          {categories.map(cat => (
            <Link key={cat.name} to={`/shop/${cat.name}`} className="group flex flex-col items-center shrink-0 snap-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 border border-gray-100 shadow-sm relative group-hover:shadow-xl transition-all duration-300">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <span className="font-display text-sm md:text-base font-semibold text-gray-900 group-hover:text-[#e42529] transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-[#fcfcfc] py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-black">Trending Now</h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">Bestselling styles to upgrade your wardrobe.</p>
            </div>
            <Link to="/shop" className="text-sm font-bold uppercase tracking-wider text-[#e42529] hidden md:flex items-center gap-2 hover:gap-4 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] skeleton rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white rounded-full font-bold text-sm tracking-widest w-full uppercase">VIEW ALL TRENDING</Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="bg-[#f0f4f8] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center border border-gray-100 relative">
          
          <div className="flex-1 w-full p-12 md:p-20 text-center md:text-left z-10 relative">
            <div className="inline-block bg-[#e42529] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Deal
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight leading-tight">Festive Essentials<br/>up to 40% Off</h2>
            <p className="text-gray-600 mb-10 max-w-md mx-auto md:mx-0 text-lg leading-relaxed">Get ready for the season with our handpicked premium ethnic wear collection.</p>
            <Link to="/shop" className="inline-block px-10 py-4 bg-black text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-gray-800 transition-colors shadow-xl">
              Shop The Sale
            </Link>
          </div>
          
          <div className="flex-1 w-full md:h-[600px] h-96 relative">
            <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1200" alt="Promo" className="w-full h-full object-cover rounded-3xl md:rounded-l-none" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
