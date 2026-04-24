import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tighter text-white mb-6">VASTRA<span className="text-[#e42529]">.</span></h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Your premium destination for authentic Indian fashion and global contemporary styles. Bringing authentic luxury to your doorstep.
          </p>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[#e42529] mb-6">Online Shopping</h4>
          <ul className="text-gray-400 space-y-3 text-sm">
            <li><Link to="/shop/Men" className="hover:text-white transition-colors">Men</Link></li>
            <li><Link to="/shop/Women" className="hover:text-white transition-colors">Women</Link></li>
            <li><Link to="/shop/Kids" className="hover:text-white transition-colors">Kids</Link></li>
            <li><Link to="/shop/Home" className="hover:text-white transition-colors">Home & Living</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Discover</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[#e42529] mb-6">Customer Service</h4>
          <ul className="text-gray-400 space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[#e42529] mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex rounded-full overflow-hidden bg-white/10" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
            />
            <button className="bg-[#e42529] text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-red-700 transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Vastra E-commerce. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
        <div className="flex gap-4 text-[10px] font-bold tracking-widest text-gray-600">
          <span>VISA</span> • <span>MASTERCARD</span> • <span>RAZORPAY</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
