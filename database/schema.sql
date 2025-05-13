-- Create users table
CREATE TABLE users(
    id SERIAL NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone bigint,
    password text NOT NULL,
    level varchar(50) DEFAULT 'user'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);

-- Create enum for product status
CREATE TYPE product_status AS ENUM ('active', 'inactive');

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    pdf_url TEXT,
    description TEXT,
    status product_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create product_features table
CREATE TABLE product_features (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    feature TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_features_updated_at
    BEFORE UPDATE ON product_features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at
    BEFORE UPDATE ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 



    -- APP CONFIG
    CREATE TABLE app_config (
        id SERIAL PRIMARY KEY,
        domain TEXT,
        mid_server_key TEXT,
        mid_client_key TEXT,
        mid_merchant_id TEXT,
        mid_base_url TEXT,
        smtp_host TEXT,
        smtp_port TEXT,
        smtp_email TEXT,
        smtp_pass TEXT,
        smtp_from TEXT,
        smtp_name TEXT,
        meta_pixe TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );


INSERT INTO app_config (
    domain,
    mid_server_key,
    mid_client_key,
    mid_merchant_id,
    mid_base_url,
    smtp_host,
    smtp_port,
    smtp_email,
    smtp_pass,
    smtp_from,
    smtp_name,
    meta_pixe
) VALUES (
    'https://jadidalmargibi.com',
    'SB-Mid-server-TvgS5N9HpYGj8lgx3hvFPSFh',
    'SB-Mid-client-RGHlGALHJ5YF5uma',
    'G034787806',
    'https://api.sandbox.midtrans.com',
    'smtp.gmail.com',
    '25',
    'jadidalmargibi@gmail.com',
    'jcsitdkcyepceifu',
    'noreply@jadidalmargibi.com',
    'ALMADEV',
    '23123123'
);
