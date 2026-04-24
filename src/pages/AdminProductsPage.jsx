import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../lib/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, RefreshCw } from 'lucide-react';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Men',
    price: '',
    original_price: '',
    image_url: '',
    sizes: 'S, M, L',
    rating: 4.5,
    tags: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        category: product.category || 'Men',
        price: product.price || '',
        original_price: product.original_price || '',
        image_url: product.image_url || '',
        sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || ''),
        rating: product.rating || 4.5,
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || '')
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        brand: '',
        category: 'Men',
        price: '',
        original_price: '',
        image_url: '',
        sizes: 'S, M, L',
        rating: 4.5,
        tags: 'new'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Parse arrays and numbers
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      original_price: parseFloat(formData.original_price) || null,
      rating: parseFloat(formData.rating) || 0,
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Manage Products</h1>
          <p className="text-gray-500 mt-2">Add, edit or remove products from the catalog.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchProducts}
            className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={20} className={loading ? "animate-spin text-gray-400" : "text-black"} />
          </button>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-[#e42529] text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#e42529] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                      No products found. Add some to get started.
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.id.slice(0, 8)}...</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 p-1 bg-red-50 rounded" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal / Slide-over */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-display font-bold">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
              <form id="productForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Original Price (₹)</label>
                  <input type="number" name="original_price" value={formData.original_price} onChange={handleInputChange} min="0" step="0.01" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Image URL</label>
                  <input type="url" name="image_url" value={formData.image_url} onChange={handleInputChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sizes (comma separated)</label>
                  <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} placeholder="e.g. S, M, L, XL" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tags (comma separated)</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g. ethnic, trending" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rating</label>
                  <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="5" step="0.1" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-gray-50">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold text-gray-600 hover:text-black uppercase text-sm tracking-widest">
                Cancel
              </button>
              <button form="productForm" type="submit" className="px-8 py-2.5 bg-black text-white font-bold uppercase text-sm tracking-widest rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
                {editingId ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProductsPage;
