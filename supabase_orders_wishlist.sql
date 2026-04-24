-- Run this in your Supabase SQL Editor to finish creating the missing tables!

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  items JSONB NOT NULL,
  address JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'Placed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on row level security for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  USING (auth.uid() = user_id);

-- 2. Create the wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Turn on row level security for wishlist
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their wishlist" 
  ON wishlist FOR ALL 
  USING (auth.uid() = user_id);
