
-- Update the handle_new_user function to assign admin role to pranu21m@gmail.com
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
    
    -- Assign admin role for pranu21m@gmail.com, student for everyone else
    IF NEW.email = 'pranu21m@gmail.com' THEN
        INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
    ELSE
        INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student');
    END IF;
    
    RETURN NEW;
END;
$function$;

-- Also check if pranu21m@gmail.com already exists and doesn't have admin role
DO $$
DECLARE
    v_user_id uuid;
BEGIN
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'pranu21m@gmail.com' LIMIT 1;
    IF v_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role) 
        VALUES (v_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;
