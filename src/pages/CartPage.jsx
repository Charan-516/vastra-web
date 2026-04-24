import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-white text-center px-4">
      <h2 className="text-4xl font-serif mb-6 text-white/50">Your bag is empty</h2>
      <Link to="/shop" className="uppercase tracking-[0.2em] text-xs border-b border-white hover:text-gold hover:border-gold pb-1 transition-colors">
        Discover Collection
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-white min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-serif mb-16 text-center border-b border-white/10 pb-8">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-10">
          {cart.map(item => (
            <div key={item.id + item.size} className="flex gap-6 pb-10 border-b border-white/10 last:border-0">
              <img src={item.image} alt={item.name} className="w-24 md:w-32 aspect-[3/4] object-cover" />
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl mb-1">{item.name}</h3>
                      <p className="text-white/50 tracking-widest uppercase text-[10px]">Size: {item.size}</p>
                    </div>
                    <p className="font-light tracking-widest">₹{item.price * item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-white/20">
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-4 py-2 hover:bg-white/10">-</button>
                    <span className="px-4 font-light text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-4 py-2 hover:bg-white/10">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.size)} className="text-[10px] uppercase tracking-widest text-white/50 hover:text-rose border-b border-white/30 hover:border-rose pb-0.5 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-4 h-fit sticky top-32 p-8 border border-white/10 bg-black/20 backdrop-blur-md">
          <h2 className="font-serif text-2xl mb-8 border-b border-white/10 pb-4">Order Summary</h2>
          <div className="space-y-4 mb-8 text-sm font-light">
            <div className="flex justify-between tracking-wider"><span className="text-white/60">Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="flex justify-between tracking-wider"><span className="text-white/60">Shipping</span><span className="text-gold tracking-widest uppercase text-[10px] self-center">Complimentary</span></div>
          </div>
          <div className="flex justify-between text-xl font-light mb-10 pt-6 border-t border-white/10">
            <span>Total</span><span className="tracking-widest">₹{cartTotal}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
