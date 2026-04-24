import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, ShieldCheck, CreditCard } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '', state: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, user shouldn't be here
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-display mb-4 font-semibold">Your bag is empty</h2>
        <Link to="/shop" className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Stubbing the real backend Razorpay call for now, directly placing via Supabase API
      await placeOrder(user.id, cart, form, cartTotal);
      clearCart();
      toast.success("Order Placed Successfully!");
      navigate('/order-success');
    } catch (err) {
      toast.error("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Secure Checkout Header */}
        <div className="flex justify-center items-center gap-2 mb-10 text-gray-500 bg-white py-4 rounded shadow-sm">
          <Lock size={18} />
          <h1 className="text-lg font-semibold uppercase tracking-widest text-center">Secure Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100">
              
              <h2 className="text-xl font-display font-semibold border-b border-gray-100 pb-4 mb-6">1. Shipping Address</h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Full Name</label>
                    <input required className="w-full bg-white border border-gray-300 p-3 outline-none focus:border-black rounded transition-colors" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-white border border-gray-300 p-3 outline-none focus:border-black rounded transition-colors" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Street Address</label>
                  <textarea required rows="2" className="w-full bg-white border border-gray-300 p-3 outline-none focus:border-black rounded transition-colors resize-none" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">State</label>
                    <input required className="w-full bg-white border border-gray-300 p-3 outline-none focus:border-black rounded transition-colors" value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">City</label>
                    <input required className="w-full bg-white border border-gray-300 p-3 outline-none focus:border-black rounded transition-colors" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Pincode</label>
                    <input required type="text" className="w-full bg-white border border-gray-300 p-3 outline-none focus:border-black rounded transition-colors" value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} />
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-display font-semibold border-b border-gray-100 pb-4 mb-6 mt-12">2. Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border border-black rounded bg-gray-50 cursor-pointer">
                  <input type="radio" name="payment" value="cod" checked readOnly className="w-4 h-4 accent-black" />
                  <div className="flex-1 font-medium">Cash on Delivery (COD)</div>
                  <CreditCard className="text-gray-400" />
                </label>
                
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded cursor-not-allowed opacity-50 relative overflow-hidden">
                  <input type="radio" name="payment" disabled className="w-4 h-4 cursor-not-allowed" />
                  <div className="flex-1 font-medium">Pay via Razorpay / Credit Card</div>
                  <div className="bg-gray-200 text-[10px] uppercase px-2 py-1 rounded font-bold">Coming Soon</div>
                </label>
              </div>

              <div className="mt-10 flex gap-4 items-center bg-green-50 text-green-800 p-4 rounded text-sm">
                <ShieldCheck size={20} className="shrink-0" />
                Your personal and payment data is secured safely by SSL encryption.
              </div>
            </form>
          </div>
          
          {/* Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h3 className="font-display font-semibold text-lg border-b border-gray-100 pb-4 mb-6 text-gray-900">Order Summary</h3>
              
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id+item.size} className="flex gap-4 items-center bg-gray-50 p-2 rounded">
                    <img src={item.image || item.image_url} alt={item.name} className="w-16 h-20 object-cover rounded bg-white shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">Size: {item.size} <span className="mx-1">•</span> Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-sm whitespace-nowrap ml-2">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span className="font-medium text-gray-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-xl text-gray-900 mb-8">
                <span>Amount to Pay</span>
                <span>₹{cartTotal}</span>
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className={`w-full py-4 uppercase tracking-widest font-semibold flex justify-center items-center gap-2 transition-all rounded shadow-sm ${
                  isSubmitting ? 'bg-gray-400 text-white cursor-wait' : 'bg-black text-white hover:bg-gray-900 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Processing...' : `Place Order • ₹${cartTotal}`}
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CheckoutPage;
