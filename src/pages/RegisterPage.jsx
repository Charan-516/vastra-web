import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    
    setIsLoading(true);
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! Please sign in.");
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex font-sans bg-white">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <h1 className="text-3xl font-display font-bold text-center">VASTRA</h1>
          </div>
          
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-500 text-sm mb-10">Join Vastra for an elevated shopping experience.</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black transition-colors" 
                placeholder="Ex. John Doe"
                value={name}
                onChange={e => setName(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black transition-colors" 
                placeholder="Ex. john@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                required
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black transition-colors" 
                placeholder="Create a password (min 6 chars)"
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 mt-4 text-sm font-semibold uppercase tracking-widest text-white transition-all ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900 hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-black hover:underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Visual Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" 
          alt="Fashion Lifestyle" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-8 rounded-lg text-center max-w-sm">
           <h3 className="font-display font-semibold text-xl mb-3 text-black">Member Benefits</h3>
           <ul className="text-sm text-gray-600 space-y-2 text-left list-disc pl-4">
             <li>Early access to sale events</li>
             <li>Exclusive personalized offers</li>
             <li>Faster checkout process</li>
             <li>Order tracking and history</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
