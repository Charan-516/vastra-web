import { supabase } from './supabase';

export const getProducts = async (category = null) => {
  try {
    let query = supabase.from('products').select('*');
    if (category && category !== 'All') query = query.eq('category', category);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('getProducts error:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('getProductById error:', error);
    return null;
  }
};

export const placeOrder = async (userId, items, address, total) => {
  try {
    const { data, error } = await supabase.from('orders').insert([{
      user_id: userId,
      items,
      address,
      total,
      status: 'Placed'
    }]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('placeOrder error:', error);
    throw error;
  }
};

export const getMyOrders = async (userId) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('getMyOrders error:', error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const { data, error } = await supabase.from('products').insert([productData]).select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('createProduct error:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const { data, error } = await supabase.from('products').update(productData).eq('id', id).select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('updateProduct error:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('deleteProduct error:', error);
    throw error;
  }
};
export const toggleWishlist = async (userId, productId) => {
  try {
    const { data: existing } = await supabase.from('wishlist').select('*').eq('user_id', userId).eq('product_id', productId).single();
    if (existing) {
      return supabase.from('wishlist').delete().eq('user_id', userId).eq('product_id', productId);
    }
    return supabase.from('wishlist').insert([{ user_id: userId, product_id: productId }]);
  } catch (error) {
    console.error('toggleWishlist error:', error);
    throw error;
  }
};

export const getWishlist = async (userId) => {
  try {
    const { data, error } = await supabase.from('wishlist').select('*, products(*)').eq('user_id', userId);
    if (error) throw error;
    return (data || []).map(item => item.products);
  } catch (error) {
    console.error('getWishlist error:', error);
    return [];
  }
};
