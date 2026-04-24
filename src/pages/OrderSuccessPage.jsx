import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 md:p-16 rounded-lg shadow-xl shadow-gray-200/50 max-w-lg w-full text-center border border-gray-100">
        
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} strokeWidth={1} className="text-green-500 animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-display font-semibold text-gray-900 mb-4">Order Confirmed!</h1>
        
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Thank you for shopping at Vastra. Your order has been successfully placed. We've sent a confirmation email to you.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mb-8">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Estimated Delivery</p>
          <p className="text-gray-900 font-medium">3 - 5 Business Days</p>
        </div>

        <Link 
          to="/shop" 
          className="block w-full bg-black text-white py-4 rounded font-semibold uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
