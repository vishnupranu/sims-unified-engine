
-- Fix function search_path for generate_application_number
CREATE OR REPLACE FUNCTION public.generate_application_number()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    NEW.application_number := 'SIMS' || TO_CHAR(NOW(), 'YY') || LPAD((SELECT COUNT(*) + 1 FROM public.admissions)::TEXT, 5, '0');
    RETURN NEW;
END;
$function$;

-- Fix function search_path for generate_slug
CREATE OR REPLACE FUNCTION public.generate_slug()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := LOWER(REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || EXTRACT(EPOCH FROM NOW())::INTEGER;
    END IF;
    RETURN NEW;
END;
$function$;

-- Fix overly permissive INSERT policy on admissions - restrict to valid submissions
DROP POLICY IF EXISTS "Anyone submit application" ON public.admissions;
CREATE POLICY "Anyone submit application" ON public.admissions
FOR INSERT WITH CHECK (
    applicant_name IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL AND
    college_applied IS NOT NULL AND
    course_applied IS NOT NULL
);
