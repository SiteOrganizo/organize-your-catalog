-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  images TEXT[],
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Criar políticas para products
CREATE POLICY "Users can view their own products" 
ON public.products 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON public.products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Política para visualização pública de produtos (para catálogo compartilhado)
CREATE POLICY "Products are viewable by everyone when shared" 
ON public.products 
FOR SELECT 
USING (true);

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para melhor performance
CREATE INDEX idx_products_user_id ON public.products(user_id);
CREATE INDEX idx_products_code ON public.products(code);
CREATE INDEX idx_products_category_id ON public.products(category_id);

-- Criar bucket de storage para imagens de produtos
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Criar políticas para o bucket de imagens
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Users can upload their own product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);