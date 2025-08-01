-- Remover todas as políticas antigas primeiro
DROP POLICY IF EXISTS "Users can view their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can create their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can update their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can delete their own categories" ON public.categories;
DROP POLICY IF EXISTS "Public read" ON public.categories;
DROP POLICY IF EXISTS "Public read access" ON public.categories;

-- Adicionar nova coluna primeiro
ALTER TABLE public.categories ADD COLUMN created_by_user_id uuid REFERENCES auth.users(id);

-- Atualizar dados existentes para usar a nova coluna
UPDATE public.categories SET created_by_user_id = user_id WHERE user_id IS NOT NULL;

-- Agora remover a coluna antiga
ALTER TABLE public.categories DROP COLUMN user_id;

-- Tornar categorias únicas globalmente
ALTER TABLE public.categories ADD CONSTRAINT unique_category_name UNIQUE (name);

-- Criar novas políticas: todos podem ver categorias, apenas criadores podem editar
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create categories" 
ON public.categories 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by_user_id);

CREATE POLICY "Category creators can update their categories" 
ON public.categories 
FOR UPDATE 
USING (auth.uid() = created_by_user_id);

CREATE POLICY "Category creators can delete their categories" 
ON public.categories 
FOR DELETE 
USING (auth.uid() = created_by_user_id);

-- Atualizar produtos para todos serem públicos por padrão
ALTER TABLE public.products ALTER COLUMN is_public SET DEFAULT true;