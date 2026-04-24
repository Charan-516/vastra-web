import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signInWithPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await signInWithPassword(email, password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back to Vastra!");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex font-sans bg-white">
      {/* Visual Section - Hidden on Mobile */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
          alt="Fashion Model" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
          <h2 className="font-display text-4xl font-bold mb-4">Discover the art of dressing well.</h2>
          <p className="text-lg opacity-90 max-w-md">Sign in to access your curated collections, fast checkout, and exclusive offers.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <h1 className="text-3xl font-display font-bold text-center">VASTRA</h1>
          </div>
          
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-10">Please enter your details to sign in.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black transition-colors" 
                placeholder="Ex. me@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">Password</label>
                <a href="#" className="text-xs text-gray-500 hover:text-black">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black transition-colors" 
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900 hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-black hover:underline underline-offset-4">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
