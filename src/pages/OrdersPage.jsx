import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../lib/api';
import { Package, Clock, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMyOrders(user.id).then(data => {
        setOrders(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center pt-32">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#e42529] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        
        <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 mb-8">
          <h1 className="text-2xl font-display font-semibold mb-2">My Orders</h1>
          <p className="text-gray-500 text-sm">View and track your previous purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center bg-white p-16 rounded shadow-sm border border-gray-100">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6 text-sm">You haven't placed any orders yet.</p>
            <Link to="/shop" className="px-6 py-3 bg-black text-white rounded font-medium shadow-sm hover:shadow-md transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded hover:shadow-md transition-shadow shadow-sm border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4 text-sm">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Order Placed</p>
                      <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Total</p>
                      <p className="font-semibold">₹{order.total}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Status</p>
                      <span className="bg-green-100 text-green-800 text-[10px] py-1 px-2 rounded font-bold uppercase tracking-widest">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-1">Order ID</p>
                    <p className="font-semibold">#{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-6 mb-6 last:mb-0 border-b sm:border-b-0 pb-6 sm:pb-0 last:border-b-0 last:pb-0 border-gray-100">
                      <div className="w-full sm:w-24 shrink-0 bg-gray-50 aspect-[3/4] sm:aspect-square overflow-hidden rounded border border-gray-100">
                        <img 
                          src={item.image || item.image_url} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h4>
                        <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
                        <div className="flex gap-4 text-sm text-gray-600 mb-4">
                          <span className="bg-gray-100 px-2 py-1 rounded">Size: <span className="font-semibold">{item.size}</span></span>
                          <span className="bg-gray-100 px-2 py-1 rounded">Qty: <span className="font-semibold">{item.quantity}</span></span>
                        </div>
                        <p className="font-bold">₹{item.price * item.quantity}</p>
                      </div>
                      
                      <div className="flex sm:flex-col justify-end items-end gap-3 shrink-0">
                        <Link to={`/product/${item.id}`} className="px-5 py-2 border border-gray-200 text-sm font-semibold rounded hover:bg-gray-50 transition w-full sm:w-auto text-center">
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
