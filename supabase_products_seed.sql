-- Run this in your Supabase SQL Editor to populate the database with premium products.
-- Make sure your "products" table has the columns listed below.

-- First, let's clear existing products to avoid duplicates (optional)
-- DELETE FROM products;

INSERT INTO products 
(name, brand, category, price, original_price, image_url, sizes, rating, tags)
VALUES
-- MEN'S SECTION
('Royal Blue Silk Blend Kurta Set', 'Manyavar', 'Men', 3499, 5999, 'https://images.unsplash.com/photo-1597983073493-88cd9b5e4b4c?w=800&q=80', ARRAY['S','M','L','XL','XXL'], 4.8, ARRAY['ethnic','wedding','premium']),
('Tailored Slim Fit Wool Suit', 'Armani Exchange', 'Men', 12499, 18999, 'https://images.unsplash.com/photo-1594938298596-70f56f0cc271?w=800&q=80', ARRAY['38','40','42','44'], 4.7, ARRAY['western','formal','premium']),
('Classic White Linen Shirt', 'Marks & Spencer', 'Men', 1999, 2999, 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', ARRAY['S','M','L','XL'], 4.6, ARRAY['western','casual','essentials']),
('Vintage Denim Jacket', 'Levi''s', 'Men', 3599, 5999, 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', ARRAY['M','L','XL'], 4.7, ARRAY['western','casual','jackets']),
('Charcoal Grey Trench Coat', 'Zara', 'Men', 8999, 12999, 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80', ARRAY['M','L','XL'], 4.9, ARRAY['western','winter','premium']),
('Minimalist Leather Sneakers', 'Puma', 'Men', 4999, 7999, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80', ARRAY['7','8','9','10','11'], 4.5, ARRAY['footwear','casual']),
('Black Silk Sherwani', 'Tasva', 'Men', 15999, 22000, 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=800&q=80', ARRAY['M','L','XL'], 4.9, ARRAY['ethnic','wedding','luxury']),

-- WOMEN'S SECTION
('Handwoven Banarasi Silk Saree', 'Nalli', 'Women', 8999, 14999, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', ARRAY['Free Size'], 4.9, ARRAY['ethnic','wedding','luxury']),
('Embroidered Georgette Lehenga', 'Ritu Kumar', 'Women', 15999, 25000, 'https://images.unsplash.com/photo-1583391733958-d25974644ed9?w=800&q=80', ARRAY['S','M','L'], 4.9, ARRAY['ethnic','designer','wedding']),
('Botanical Print Sundress', 'Zara', 'Women', 2499, 3999, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', ARRAY['XS','S','M','L'], 4.5, ARRAY['western','casual','summer']),
('Modern Chic Co-ord Set', 'Mango', 'Women', 4599, 6999, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', ARRAY['S','M','L'], 4.4, ARRAY['western','formal','trending']),
('Velvet Cocktail Maxi Dress', 'H&M', 'Women', 3999, 5999, 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80', ARRAY['XS','S','M','L'], 4.8, ARRAY['western','party','evening']),
('Pastel Anarkali Suit', 'Biba', 'Women', 4299, 6999, 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?w=800&q=80', ARRAY['S','M','L','XL'], 4.6, ARRAY['ethnic','festive']),
('Stiletto Heel Pumps', 'Steve Madden', 'Women', 5999, 8999, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80', ARRAY['36','37','38','39','40'], 4.7, ARRAY['footwear','party']),

-- KIDS' SECTION
('Kids Festive Kurta Pajama', 'Biba', 'Kids', 1499, 2499, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80', ARRAY['4-5Y','6-7Y','8-9Y'], 4.4, ARRAY['ethnic','kids','festive']),
('Denim Dungarees', 'Mothercare', 'Kids', 1299, 1999, 'https://images.unsplash.com/photo-1519238399581-285623098e98?w=800&q=80', ARRAY['2-3Y','4-5Y','6-7Y'], 4.5, ARRAY['western','casual']),
('Fairy Tale Tutu Dress', 'Allen Solly Junior', 'Kids', 2199, 3499, 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80', ARRAY['3-4Y','5-6Y','7-8Y'], 4.8, ARRAY['party','girls']),

-- BEAUTY & ACCESSORIES
('Oud Wood Eau De Parfum', 'Tom Ford', 'Beauty', 18500, 21000, 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=800&q=80', ARRAY['50ml','100ml'], 4.9, ARRAY['beauty','fragrance','luxury']),
('Matte Revolution Lipstick', 'Charlotte Tilbury', 'Beauty', 3500, 4200, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80', ARRAY['Pillow Talk'], 4.8, ARRAY['beauty','makeup','premium']),
('Textured Leather Tote Bag', 'Michael Kors', 'Accessories', 14500, 22000, 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80', ARRAY['One Size'], 4.7, ARRAY['accessories','bags','designer']),
('Rose Gold Chronograph Watch', 'Fossil', 'Accessories', 11995, 14995, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', ARRAY['One Size'], 4.6, ARRAY['accessories','watches','gift']),
('Crystal Drop Earrings', 'Swarovski', 'Accessories', 8999, 11000, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', ARRAY['One Size'], 4.8, ARRAY['jewelry','luxury']),

-- HOME & LIVING
('Cotton Block Print Bedsheet', 'FabIndia', 'Home', 2299, 3499, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', ARRAY['King'], 4.5, ARRAY['home','decor','ethnic']),
('Ceramic Dinner Set', 'Chumbak', 'Home', 4999, 7999, 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80', ARRAY['16 Piece'], 4.6, ARRAY['home','kitchen','gift']),
('Scented Soy Candle Set', 'Bath & Body Works', 'Home', 1999, 2599, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80', ARRAY['Set of 3'], 4.8, ARRAY['home','fragrance']),
('Handwoven Jute Rug', 'IKEA', 'Home', 3499, 4999, 'https://images.unsplash.com/photo-1581078734612-4ee8fbcdb9d9?w=800&q=80', ARRAY['5x7 ft'], 4.4, ARRAY['home','decor']);

