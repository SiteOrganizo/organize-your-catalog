-- Modificar categorias para serem globais
ALTER TABLE public.categories DROP COLUMN user_id;

-- Adicionar campo para indicar se é categoria criada por usuário ou admin
ALTER TABLE public.categories ADD COLUMN created_by_user_id uuid REFERENCES auth.users(id);

-- Tornar categorias únicas globalmente
ALTER TABLE public.categories ADD CONSTRAINT unique_category_name UNIQUE (name);

-- Atualizar políticas RLS para categorias globais
DROP POLICY IF EXISTS "Users can view their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can create their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can update their own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can delete their own categories" ON public.categories;

-- Novas políticas: todos podem ver categorias, apenas criadores podem editar
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