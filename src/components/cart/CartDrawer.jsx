import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-display font-medium flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Bag ({cart.reduce((a, c) => a + c.quantity, 0)})
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your shopping bag is empty.</p>
              <button 
                onClick={() => { closeCart(); navigate('/shop'); }}
                className="px-6 py-2 border border-black text-black font-medium hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id + item.size} className="flex gap-4 group">
                  <img src={item.image || item.image_url} alt={item.name} className="w-20 h-28 object-cover rounded bg-gray-100" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm line-clamp-2 leading-tight">{item.name}</h3>
                        <p className="font-semibold text-sm ml-4">₹{item.price * item.quantity}</p>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">Size: {item.size}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-1.5 hover:bg-gray-50 text-gray-600">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-1.5 hover:bg-gray-50 text-gray-600">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)} 
                        className="text-xs text-gray-400 underline underline-offset-2 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between mb-6 text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between mb-6 text-lg font-medium">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button 
              onClick={() => { closeCart(); navigate('/checkout'); }}
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              Checkout Seamlessly
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
